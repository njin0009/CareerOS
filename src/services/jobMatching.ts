import type { CareerStrategy } from '../stores/strategy';

export interface MatchableJob {id:string;company:string;role:string;location:string;level:string;fit:string;requirements:string[];check:string;deadline:string;url:string;verificationStatus:string;verifiedAt:string;verificationNote:string}
export interface JobMatch {job:MatchableJob;score:number;priority:'P1'|'P2'|'P3';eligibility:'符合方向'|'先核验'|'不建议';confidence:'高'|'中'|'低';evidence:string[];gaps:string[];reason:string}

export function matchJob(job:MatchableJob,strategy:CareerStrategy):JobMatch{
  if(job.verificationStatus!=='active_exact')return{job,score:0,priority:'P3',eligibility:'不建议',confidence:'低',evidence:[],gaps:['不是已核验的准确官方职位页面'],reason:'职位页面或地点未能准确核验，不进入每日推荐。'};
  const text=`${job.role} ${job.fit} ${job.requirements.join(' ')}`.toLowerCase();
  let score=0;
  const evidence:string[]=[],gaps:string[]=[];
  const city=strategy.cities.some(c=>job.location.toLowerCase().includes(c.toLowerCase()));
  score+=city?10:2;if(city)evidence.push(`地点符合：${strategy.cities.filter(c=>job.location.includes(c)).join(' / ')}`);else gaps.push('地点不在主要策略中');
  const roleHits=strategy.roles.filter(role=>role.toLowerCase().split(/\s|\//).filter(x=>x.length>2).some(k=>text.includes(k)));
  score+=Math.min(25,roleHits.length*10);if(roleHits.length)evidence.push(`方向符合：${roleHits.join('、')}`);else gaps.push('职位方向与首选岗位重合较少');
  if(/requirement|acceptance|system|business analyst|implementation/.test(text)){score+=25;evidence.push('简历证据：需求、验收标准、系统交付与跨团队协作');}
  if(/ai|llm|automation/.test(text)){score+=15;evidence.push('简历证据：AI工作流、LLM与AWS原型');}
  if(/research/.test(text)){score+=6;evidence.push('可迁移证据：用户研究与产品项目');gaps.push('缺少持续的专业研究项目证据');}
  const senior=/senior|lead|manager/.test(job.role.toLowerCase());
  if(senior){score-=25;gaps.push('Senior责任缺口：尚未充分证明独立领导大型BA工作流及指导其他BA');}
  if(/graduate/.test(job.role.toLowerCase())){gaps.push('Graduate毕业时间及工作权资格必须核验');}
  if(/3–4|3-4/.test(job.requirements.join(' '))){score-=7;gaps.push('广告约3–4年经验；正式BA年限可能不足');}
  if(strategy.exclusions.some(x=>x.toLowerCase().includes('senior'))&&senior)score-=20;
  score=Math.max(0,Math.min(100,score));
  const eligibility:JobMatch['eligibility']=senior?'不建议':'先核验';
  const priority:JobMatch['priority']=eligibility==='不建议'||score<50?'P3':score>=70?'P1':'P2';
  const confidence:JobMatch['confidence']=job.deadline.includes('未显示')?'中':'高';
  const reason=priority==='P1'?'核心任务有直接证据，完成资格核验后优先申请。':priority==='P2'?'有可迁移证据，但需要定制材料或确认资格。':'差距或职级风险较大，更适合作为职业参考。';
  return{job,score,priority,eligibility,confidence,evidence,gaps,reason};
}
