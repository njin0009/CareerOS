<script setup lang="ts">
import { computed } from 'vue';
import jobs from '../data/daily-jobs.json';
import metadata from '../data/metadata.json';
import { strategy } from '../stores/strategy';
import { matchJob } from '../services/jobMatching';
const matches=computed(()=>jobs.map(job=>matchJob(job,strategy)).sort((a,b)=>b.score-a.score));
const recommended=computed(()=>matches.value.filter(x=>x.priority!=='P3').slice(0,4));
</script>
<template><section class="daily-applications"><div class="section-head"><div><div class="eyebrow">DAILY APPLICATION PLAN</div><h2>今天值得处理的职位</h2></div><div class="actions"><span class="pill">核验于 {{metadata.dataDate}}</span><RouterLink to="/match">完整匹配解释 →</RouterLink></div></div><p class="daily-intro">根据你保存的策略重新排序。没有足够依据时不会为了达到数量而强制推荐。</p><div class="daily-job-grid"><article v-for="m in recommended" :key="m.job.id" class="card daily-job"><div class="daily-job-top"><span class="pill priority">{{m.priority}} · {{m.score}}分</span><span>{{m.job.location}}</span></div><h3>{{m.job.role}}</h3><b>{{m.job.company}}</b><p>{{m.reason}}</p><details><summary>为什么推荐与需要核对什么</summary><ul><li v-for="item in m.evidence" :key="item">{{item}}</li><li v-for="item in m.gaps" :key="item">风险：{{item}}</li></ul><p><b>资格：</b>{{m.eligibility}} · 置信度 {{m.confidence}}</p></details><div class="actions"><RouterLink to="/match" class="button primary">先查看完整解释</RouterLink><a :href="m.job.url" target="_blank" rel="noopener noreferrer" class="button">官方职位 ↗</a></div></article></div><p v-if="!recommended.length" class="card empty">当前没有达到P1/P2的职位。请修改策略或等待新的已核实职位，不建议为了数量盲目申请。</p><p class="meta">分数不是录用概率；官方页面、截止日期与工作权需要在每次申请前确认。</p></section></template>
