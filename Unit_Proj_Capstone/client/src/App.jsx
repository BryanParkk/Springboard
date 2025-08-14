import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import ProtectedRoute from '../../server/routes/ProtectedRoute.jsx';
import AppLayout from './layouts/AppLayout';

// Pages
import Login from './features/auth/LoginPage';
import Dashboard from './features/pages/Dashboard';
import LogWorkout from './features/pages/LogWorkout';
import WorkoutRoutine from './features/pages/WorkoutRoutine';
import MealPlan from './features/pages/MealPlan';
import Settings from './features/pages/Settings';
import ExercisesGuide from './features/pages/ExercisesGuide';
import SignUp from './features/auth/SignUpPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Route (Login required) */}
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


// To start.
// Terminal 1 : npm run start
// Terminal 2 : npm run dev