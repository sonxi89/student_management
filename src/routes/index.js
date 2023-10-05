import Home from '../pages/Home';
import ListAward from '../pages/ListAward';
import ListStudent from '../pages/ListStudent';
import UploadFile from '../pages/UploadFile';
// import UploadFile from '../components/UploadFile/ExcelUploader';

const publicRoutes = [
  { path: 'dashboard', component: Home },
  { path: 'award', component: ListAward },
  { path: 'student', component: ListStudent },
  { path: 'upload', component: UploadFile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
