import type { Application, CompanyStatus } from '../types';
const STATUS_KEY='au-career-company-status',TRACKER_KEY='au-career-tracker';
export const loadStatuses=()=>JSON.parse(localStorage.getItem(STATUS_KEY)||'{}') as Record<string,CompanyStatus>;
export const saveStatuses=(value:Record<string,CompanyStatus>)=>localStorage.setItem(STATUS_KEY,JSON.stringify(value));
export const loadApplications=()=>JSON.parse(localStorage.getItem(TRACKER_KEY)||'[]') as Application[];
export const saveApplications=(value:Application[])=>localStorage.setItem(TRACKER_KEY,JSON.stringify(value));
export function backup(statuses:Record<string,CompanyStatus>,applications:Application[]){return JSON.stringify({version:2,exportedAt:new Date().toISOString(),companyStatus:statuses,tracker:applications},null,2)}
