import Home from '../pages/Home';
import ListScore from '../pages/ListScore';
import ListStudent from '../pages/ListStudent';
import UploadFile from '../pages/UploadFile';
import ListAward from '../pages/ListAward';
import Statistics from '../pages/Statistics';
import Admin from '../pages/Admin';

const publicRoutes = [
  { path: 'dashboard', component: Home },
  { path: 'score', component: ListScore },
  { path: 'student', component: ListStudent },
  { path: 'upload', component: UploadFile },
  { path: 'award', component: ListAward },
  { path: 'statistics', component: Statistics },
  { path: 'admin', component: Admin },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
