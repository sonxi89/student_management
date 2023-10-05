import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="*" element={<DefaultLayout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
