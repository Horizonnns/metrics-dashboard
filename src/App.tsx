import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import WelcomePage from "./pages/WelcomePage";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

const AppContent: React.FC = () => {
  const { selectedBotId } = useSelector((state: RootState) => state.bots);

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={selectedBotId ? <DashboardPage /> : <WelcomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
