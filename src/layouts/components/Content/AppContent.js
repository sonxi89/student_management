import { publicRoutes } from '../../../routes';
import { Route, Routes, Navigate } from 'react-router-dom';

function AppContent() {
  return (
    <div>
      <Routes>
        {publicRoutes.map((route, index) => {
          return route.component && <Route key={index} path={route.path} element={<route.component />} />;
        })}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default AppContent;
