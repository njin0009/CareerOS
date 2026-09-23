import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import DashboardPage from './pages/DashboardPage.vue';
import CompaniesPage from './pages/CompaniesPage.vue';
import CompanyDetailPage from './pages/CompanyDetailPage.vue';
import IndustriesPage from './pages/IndustriesPage.vue';
import IndustryDetailPage from './pages/IndustryDetailPage.vue';
import RolesPage from './pages/RolesPage.vue';
import TrackerPage from './pages/TrackerPage.vue';
import VisaStrategyPage from './pages/VisaStrategyPage.vue';
import SourcesPage from './pages/SourcesPage.vue';
import ProfilePage from './pages/ProfilePage.vue';
import './styles.css';
import './extra.css';
import './dashboard.css';
import './workspace.css';
import './dashboard-switch.css';
import './bright-theme.css';
import './tracker-board.css';
import './daily-applications.css';

const router=createRouter({history:createWebHashHistory(),routes:[
  {path:'/',component:DashboardPage},{path:'/profile',component:ProfilePage},{path:'/companies',component:CompaniesPage},
  {path:'/companies/:id',component:CompanyDetailPage},{path:'/industries',component:IndustriesPage},
  {path:'/industries/:id',component:IndustryDetailPage},{path:'/roles',component:RolesPage},
  {path:'/tracker',component:TrackerPage},{path:'/visa-strategy',component:VisaStrategyPage},{path:'/sources',component:SourcesPage}
]});
createApp(App).use(router).mount('#app');
