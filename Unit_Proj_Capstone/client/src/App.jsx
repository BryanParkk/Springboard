import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import ProtectedRoute from '../../server/routes/ProtectedRoute.jsx';
import AppLayout from './layouts/AppLayout';

// 페이지들 (네가 올린 경로 유지)
import Login from './features/auth/LoginPage';
import Dashboard from './features/pages/Dashboard';
import LogWorkout from './features/pages/LogWorkout';
import WorkoutRoutine from './features/pages/WorkoutRoutine';
import MealPlan from './features/pages/MealPlan';
import Settings from './features/pages/Settings';
import ExercisesGuide from './features/pages/ExercisesGuide';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/login" element={<Login />} />

          {/* 보호 라우트 (로그인 필요) */}
          <Route element={<ProtectedRoute />}> 
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/log"       element={<AppLayout><LogWorkout /></AppLayout>} />
            <Route path="/routine"   element={<AppLayout><WorkoutRoutine /></AppLayout>} />
            <Route path="/exercises" element={<AppLayout><ExercisesGuide /></AppLayout>} />
            <Route path="/meals"     element={<AppLayout><MealPlan /></AppLayout>} />
            <Route path="/settings"  element={<AppLayout><Settings /></AppLayout>} />
          </Route>

          {/* 404 처리 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}