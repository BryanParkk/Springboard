import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import HomePage from "../pages/HomePage.jsx";
import SpacecraftsPage from "..//pages/SpacecraftsPage.jsx";
import SpacecraftDetailPage from "../pages/SpacecraftDetailPage.jsx";
import BuildSpacecraftPage from "../pages/BuildSpacecraftPage.jsx";
import PlanetsPage from "../pages/PlanetsPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/spacecrafts" element={<SpacecraftsPage />} />
        <Route path="/spacecrafts/new" element={<BuildSpacecraftPage />} />
        <Route path="/spacecrafts/:id" element={<SpacecraftDetailPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}