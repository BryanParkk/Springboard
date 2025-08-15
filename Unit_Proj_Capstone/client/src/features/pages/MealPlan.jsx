// // src/pages/MealPlan.jsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import "../../styles/layout/MealPlan.css"

// export default function MealPlan() {
//   const [meals, setMeals] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5001/api/meals")
//     .then((res) => {
//       setMeals(res.data);
//     })
//     .catch((err) => {
//       console.error("Error fetching meals:", err);
//     })
//   }, []);
  
//   return (
//     <div className="meal-plan-container">
//       <h1>Meal Plan</h1>
//       <p className="subtitle">Discover meals tailored to your fitness goals</p>

//       <div className="search-section">
//         <input type="text" placeholder="Search meal plan..." />
//         <button>Search</button>
//       </div>

//       <div className="meal-cards">
//         {meals.map((meal) => (
//           <div className="meal-card" key={meal.id}>
//             <img className="meal-img" src={meal.image_url} alt={meal.name}/>
//             <h3>{meal.name}</h3>
//             <p><strong>Type:</strong> {meal.type}</p>
//             <p><strong>Calories:</strong> {meal.calories} kcal</p>
//             <p><strong>Protein:</strong> {meal.protein}g</p>
//             <p><strong>Carbs:</strong> {meal.carbs}g</p>
//             <p><strong>Fat:</strong> {meal.fat}g</p>
//             <p><strong>Goal:</strong> {meal.goal}</p>
//             <details>
//               <summary>Recipe</summary>
//               <div dangerouslySetInnerHTML={{ __html: meal.recipe }} />
//             </details>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import axios from 'axios';
import CategorySelector from './CategorySelector';
import '../../styles/layout/MealPlan.css';

export default function MealPlan() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 8;

  useEffect(() => {
    axios.get('/api/meals')
      .then(res => {
        setMeals(res.data);
        setFilteredMeals(res.data);
      })
      .catch(err => console.error('Error fetching meals:', err));
  }, []);

  const handleValueSelect = (category, value) => {
    let filtered = [];

    if (category === 'type') {
      filtered = meals.filter(meal => meal.type === value);
    } else if (category === 'calories') {
      if (value === '<300') filtered = meals.filter(meal => meal.calories < 300);
      else if (value === '300-500') filtered = meals.filter(meal => meal.calories >= 300 && meal.calories <= 500);
      else if (value === '500-700') filtered = meals.filter(meal => meal.calories > 500 && meal.calories <= 700);
      else if (value === '>700') filtered = meals.filter(meal => meal.calories > 700);
    } else if (category === 'protein') {
      if (value === '<15g') filtered = meals.filter(meal => meal.protein < 15);
      else if (value === '15-30g') filtered = meals.filter(meal => meal.protein >= 15 && meal.protein <= 30);
      else if (value === '30-45g') filtered = meals.filter(meal => meal.protein > 30 && meal.protein <= 45);
      else if (value === '>45g') filtered = meals.filter(meal => meal.protein > 45);
    } else if (category === 'goal') {
      filtered = meals.filter(meal => meal.goal === value);
    }

    setFilteredMeals(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const filtered = meals.filter(meal => meal.name.toLowerCase().includes(term));
    setFilteredMeals(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  const totalPages = Math.ceil(filteredMeals.length / mealsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="meal-plan-container">
      <h1 className="gradient-text">Meal Plan</h1>
      <p className="subtitle">Discover meals tailored to your fitness goals</p>
      <CategorySelector 
        onCategorySelect={() => {}} 
        onValueSelect={handleValueSelect} 
        onSearch={handleSearch} 
      />

      <div className="meal-cards-grid">
        {currentMeals.map(meal => (
          <div key={meal.id} className="meal-card">
            <img src={meal.image_url} alt={meal.name} className="meal-img" />
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

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}
