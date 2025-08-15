// src/pages/ExerciseGuide.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/layout/ExercisesGuide.css";

export default function ExerciseGuide() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get("/api/exercises")
    .then((res) => {
      setExercises(res.data);
    })
    .catch((err) => {
      console.error("Error fetching exercises:", err);
    });
  }, []);

  return (
    <div className="exercise-guide-container">
      <h1 className='headline'>Exercise Guide</h1>
      <p className="subtitle">Find the best exercise guide tailored for you</p>

      <div className="search-section">
        <input type="text" placeholder="Search exercises..." />
        <button>Search</button>
      </div>

      <div className="exercise-cards">
        {/* 운동 카드들이 여기에 렌더링됨 */}
        {exercises.map((ex) => (
          <div className="exercise-card" key={ex.id}>
            {/* <img src={ex.image_url} alt={ex.name} style={{ width: "100%", borderRadius: "6px"}} /> */}
            <img className="exercise-img" src={ex.image_url}/>
            <h3>{ex.name}</h3>
            <p><strong>Body: </strong> {ex.body_part}</p>
            <p><strong>Target: </strong> {ex.target_muscle}</p>
            <p><strong>Equipment: </strong> {ex.equipment}</p>
            <p><strong>Difficulty: </strong> {ex.difficulty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}