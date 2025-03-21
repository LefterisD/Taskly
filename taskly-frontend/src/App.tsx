import { Routes, Route, Navigate } from 'react-router';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Layout from './components/layout/layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
