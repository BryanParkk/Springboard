import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout';

import Login from './features/auth/LoginPage';
import Dashboard from './features/pages/Dashboard';
import LogWorkout from "./features/pages/LogWorkout";
import WorkoutRoutine from "./features/pages/WorkoutRoutine";
import MealPlan from "./features/pages/MealPlan";
import Settings from "./features/pages/Settings";
import ExercisesGuide from './features/pages/ExercisesGuide';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<AppLayout> <Dashboard /> </AppLayout>} />
        <Route path="/log" element={<AppLayout> <LogWorkout /> </AppLayout>} />
        <Route path="/routine" element={<AppLayout> <WorkoutRoutine /> </AppLayout>} />
        <Route path="/exercises" element={<AppLayout> <ExercisesGuide /> </AppLayout>} />
        <Route path="/meals" element={<AppLayout> <MealPlan /> </AppLayout>} />
        <Route path="/settings" element={<AppLayout> <Settings /> </AppLayout>} />
      </Routes>
    </Router>
  );
}

export default App;