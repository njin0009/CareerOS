import type { Company, VisaFit } from '../types';
export function visaFit(company:Company):[VisaFit,string]{
  if(company.industry.includes('Defence')) return ['通常受限','多需公民身份或安全许可；只投明确接受当前身份的职位'];
  if(company.industry.includes('政府数字化')) return ['逐条核对','APS常有公民门槛；州政府、合同商及个别岗位规则不同'];
  return ['主申请池','可优先研究普通企业岗位，不代表签证资格已确认；逐条核对广告、当前工作权和合同期限。竞争难度不属于签证资格。'];
}
export function fitScore(company:Company):number{
  let score=company.priority==='P1'?40:company.priority==='P2'?24:10;
  score+=company.cities.includes('Melbourne')?30:0;
  const visa=visaFit(company)[0]; score+=visa==='主申请池'?25:visa==='逐条核对'?8:-20;
  if(['银行金融','咨询','Enterprise Tech','Cloud/Enterprise Tech','数字平台','能源公用事业','医疗科技','新能源与智能出行'].includes(company.industry)) score+=5;
  return Math.max(0,Math.min(100,score));
}
export function timingFor(company:Company):[string,string]{
  const visa=visaFit(company)[0],mel=company.cities.includes('Melbourne');
  if(visa==='通常受限') return ['暂不作为主投','只有广告明确接受你的身份且不要求安全许可时再投。'];
  if(company.priority==='P1'&&visa==='主申请池'&&mel) return ['现在投 · 每周检查','发现70%以上匹配的普通职位后48小时内申请。'];
  if(company.priority==='P1'&&visa==='主申请池') return ['现在投 · 先确认地点','接受跨州或hybrid时立即投，否则设置职位提醒。'];
  if(company.industry==='新能源与智能出行') return ['事件驱动 · 每周监控','新品、渠道、储能项目或本地团队扩张时是重点窗口。'];
  if(visa==='逐条核对') return ['选择性投递','先确认work rights、合同期限和项目资格。'];
  return ['双周监控','匹配度高于80%或有内部推荐时申请。'];
}
