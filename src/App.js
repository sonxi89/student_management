import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import './App.css';
import { DefaultLayout } from './layouts';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/home" element={localStorage.getItem('accessToken') ? <DefaultLayout /> : <Navigate to="/" />}>
            <Route index element={<Navigate to="dashboard" />} />
            {publicRoutes.map((route, index) => {
              return route.component && <Route key={index} path={route.path} element={<route.component />} />;
            })}
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
