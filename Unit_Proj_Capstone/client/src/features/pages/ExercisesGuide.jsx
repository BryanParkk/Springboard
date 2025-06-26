// src/pages/ExerciseGuide.jsx
import "../../styles/layout/ExercisesGuide.css";

export default function ExerciseGuide() {
  return (
    <div className="exercise-guide-container">
      <h1>Exercise Guide</h1>
      <p className="subtitle">Find the best exercise guide tailored for you</p>

      <div className="search-section">
        <input type="text" placeholder="Search exercises..." />
        <button>Search</button>
      </div>

      <div className="exercise-cards">
        {/* 운동 카드들이 여기에 렌더링됨 */}
      </div>
    </div>
  );
}