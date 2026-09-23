import { reactive, watch } from 'vue';

export interface CareerStrategy {
  cities:string[]; industries:string[]; roles:string[]; workTypes:string[];
  exclusions:string[]; naturalLanguage:string; workRights:'confirmed'|'verify'|'unknown';
}

const defaults:CareerStrategy={
  cities:['Melbourne'],
  industries:['GovTech','Enterprise Software','Automotive Technology'],
  roles:['Technical Business Analyst','Systems Analyst','Implementation Analyst','AI Workflow Analyst'],
  workTypes:['Permanent','Fixed-term'], exclusions:['Defence clearance','Lead/Manager'],
  naturalLanguage:'Melbourne first. Focus on technical BA, systems, implementation and AI workflow roles. Avoid roles that require citizenship, security clearance or established people-management experience.',
  workRights:'verify'
};

export const strategy=reactive<CareerStrategy>({...defaults});
try{Object.assign(strategy,JSON.parse(localStorage.getItem('career-os-strategy')||'{}'));}catch{/* keep defaults */}
watch(strategy,()=>localStorage.setItem('career-os-strategy',JSON.stringify(strategy)),{deep:true});

export function interpretStrategy(text:string){
  const lower=text.toLowerCase();
  const cities=['Melbourne','Sydney','Brisbane','Perth'].filter(city=>lower.includes(city.toLowerCase()));
  const roles:[string,string[]][]=[
    ['Technical Business Analyst',['technical ba','technical business analyst']],
    ['Business Analyst',['business analyst',' ba ']],['Systems Analyst',['system analyst','systems analyst']],
    ['Implementation Analyst',['implementation']],['AI Workflow Analyst',['ai','automation','llm']],
    ['Product Analyst',['product']],['Test / UAT Analyst',['test','qa','uat']]
  ];
  const selected=roles.filter(([,keys])=>keys.some(key=>lower.includes(key))).map(([role])=>role);
  const exclusions:string[]=[];
  if(/no senior|avoid senior|not senior|too senior/.test(lower))exclusions.push('Senior roles');
  if(/no contract|avoid contract|permanent only/.test(lower))exclusions.push('Short contracts');
  if(/no consulting|avoid consulting/.test(lower))exclusions.push('Consulting');
  if(cities.length)strategy.cities=cities;
  if(selected.length)strategy.roles=[...new Set(selected)];
  strategy.exclusions=[...new Set([...strategy.exclusions,...exclusions])];
  strategy.naturalLanguage=text;
}
