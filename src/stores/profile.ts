import { reactive, watch } from 'vue';
export interface Profile { name:string; city:string; education:string; strengths:string; goal:string; visa:string; linkedin:string; seek:string; portfolio:string; resumeName:string; resumeData:string }
const defaults:Profile={name:'Nora Jin',city:'Melbourne · Open to relocation',education:'Economics and Finance + Monash Master of IT (2026)',strengths:'需求与验收标准 · 汽车软件发布 · 澳洲 GovTech · AI 工作流原型 · PMP · AWS AI Practitioner',goal:'Technical / Digital BA · Implementation · Systems Integration · AI-enabled Digital Delivery',visa:'485 申请期间的过桥签证（工作权需自行核实）',linkedin:'https://linkedin.com/in/norajin-it',seek:'',portfolio:'https://versionportfolio.norajinreferralportfolio.site',resumeName:'',resumeData:''};
export const profileMessage=reactive({text:''});
export const profile=reactive<Profile>({...defaults});
try { const saved=JSON.parse(localStorage.getItem('career-os-profile')||'{}'); for(const key of Object.keys(defaults) as (keyof Profile)[]) if(typeof saved[key]==='string')profile[key]=saved[key]; } catch { profileMessage.text='无法读取个人资料；请检查浏览器存储或恢复备份。'; }
watch(profile,()=>{try{localStorage.setItem('career-os-profile',JSON.stringify(profile));profileMessage.text='已自动保存到此浏览器';}catch{profileMessage.text='保存失败：浏览器空间不足，请下载备份并使用较小的简历。';}},{deep:true});
export function safeLink(value:string){try{const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:'';}catch{return '';}}
