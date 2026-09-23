export type Priority = 'P1' | 'P2' | 'P3';
export type VisaFit = '主申请池' | '逐条核对' | '通常受限';
export type CompanyStatus = '未开始' | '研究中' | '已投递' | '面试中' | '暂停';
export interface Company { id:string; name:string; cities:string[]; industry:string; recommendedRoles:string[]; fitReason:string; focusAreas:string[]; priority:Priority; careerUrl:string }
export interface ResearchSignal { period:string; summary:string; sourceUrl:string }
export interface Application { id:number; company:string; role:string; city:string; status:string; date:string; note:string; jobUrl?:string; deadline?:string; nextDate?:string; nextAction?:string; resumeVersion?:string; eligibility?:string }
export interface Source { title:string; url:string; note:string }
