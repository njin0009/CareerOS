import { computed, reactive } from 'vue';
import companiesData from '../data/companies.json';
import { loadApplications,loadStatuses,saveApplications,saveStatuses } from '../services/storage';
import type { Application,Company,CompanyStatus } from '../types';
export const companies=companiesData as Company[];
export const state=reactive({statuses:loadStatuses(),applications:loadApplications() as Application[]});
export const activeCount=computed(()=>Object.values(state.statuses).filter(x=>['已投递','面试中'].includes(x)).length);
export function setCompanyStatus(name:string,status:CompanyStatus){state.statuses[name]=status;saveStatuses(state.statuses)}
export function addApplication(value:Omit<Application,'id'>){state.applications.unshift({id:Date.now(),...value});saveApplications(state.applications)}
export function deleteApplication(id:number){state.applications=state.applications.filter(x=>x.id!==id);saveApplications(state.applications)}
export function updateApplication(id:number,value:Omit<Application,'id'>){const index=state.applications.findIndex(x=>x.id===id);if(index>=0){state.applications[index]={id,...value};saveApplications(state.applications)}}
