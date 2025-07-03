// src/pages/MealPlan.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/layout/MealPlan.css"

export default function MealPlan() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/meals")
    .then((res) => {
      setMeals(res.data);
    })
    .catch((err) => {
      console.error("Error fetching meals:", err);
    })
  }, []);
  
  return (
    <div className="meal-plan-container">
      <h1>Meal Plan</h1>
      <p className="subtitle">Discover meals tailored to your fitness goals</p>

      <div className="meal-cards">
        {meals.map((meal) => (
          <div className="meal-card" key={meal.id}>
            <img src={meal.image_url} alt={meal.name}/>
            <h3>{meal.name}</h3>
            <p><strong>Type:</strong> {meal.type}</p>
            <p><strong>Calories:</strong> {meal.calories} kcal</p>
            <p><strong>Protein:</strong> {meal.protein}g</p>
            <p><strong>Carbs:</strong> {meal.carbs}g</p>
            <p><strong>Fat:</strong> {meal.fat}g</p>
            <p><strong>Goal:</strong> {meal.goal}</p>
            <details>
              <summary>Recipe</summary>
              <div dangerouslySetInnerHTML={{ __html: meal.recipe }} />
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}