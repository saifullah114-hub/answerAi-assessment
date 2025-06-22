import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/charging-station" replace />} />

      <Route path="/charging-station" element={<Dashboard/>} />
      <Route path="/charging-station/notification" element={<Dashboard />} />
      <Route path="/charging-station/alert" element={<Dashboard />} />
      <Route path="/charging-station/target" element={<Dashboard />} />
      <Route path="/charging-station/settings" element={<Dashboard />} />

      <Route path="/fleet-sizing" element={<Dashboard />} />
      <Route path="/fleet-sizing/notification" element={<Dashboard />} />
      <Route path="/fleet-sizing/alert" element={<Dashboard />} />
      <Route path="/fleet-sizing/target" element={<Dashboard />} />
      <Route path="/fleet-sizing/settings" element={<Dashboard />} />

      <Route path="/parking" element={<Dashboard />} />
      <Route path="/parking/notification" element={<Dashboard />} />
      <Route path="/parking/alert" element={<Dashboard />} />
      <Route path="/parking/target" element={<Dashboard />} />
      <Route path="/parking/settings" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
