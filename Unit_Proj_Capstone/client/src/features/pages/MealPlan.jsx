// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import CategorySelector from './MealCategorySelector';
// import '../../styles/layout/MealPlan.css';

// export default function MealPlan() {
//   const [meals, setMeals] = useState([]);
//   const [filteredMeals, setFilteredMeals] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const mealsPerPage = 8;

//   useEffect(() => {
//     axios.get('/api/meals')
//       .then(res => {
//         setMeals(res.data);
//         setFilteredMeals(res.data);
//       })
//       .catch(err => console.error('Error fetching meals:', err));
//   }, []);

//   const handleValueSelect = (category, value) => {
//     let filtered = [];

//     if (category === 'type') {
//       filtered = meals.filter(meal => meal.type === value);
//     } else if (category === 'calories') {
//       if (value === '<300') filtered = meals.filter(meal => meal.calories < 300);
//       else if (value === '300-500') filtered = meals.filter(meal => meal.calories >= 300 && meal.calories <= 500);
//       else if (value === '500-700') filtered = meals.filter(meal => meal.calories > 500 && meal.calories <= 700);
//       else if (value === '>700') filtered = meals.filter(meal => meal.calories > 700);
//     } else if (category === 'protein') {
//       if (value === '<15g') filtered = meals.filter(meal => meal.protein < 15);
//       else if (value === '15-30g') filtered = meals.filter(meal => meal.protein >= 15 && meal.protein <= 30);
//       else if (value === '30-45g') filtered = meals.filter(meal => meal.protein > 30 && meal.protein <= 45);
//       else if (value === '>45g') filtered = meals.filter(meal => meal.protein > 45);
//     } else if (category === 'goal') {
//       filtered = meals.filter(meal => meal.goal === value);
//     }

//     setFilteredMeals(filtered);
//     setCurrentPage(1);
//   };

//   const handleSearch = (searchTerm) => {
//     const term = searchTerm.toLowerCase();
//     const filtered = meals.filter(meal => meal.name.toLowerCase().includes(term));
//     setFilteredMeals(filtered);
//     setCurrentPage(1);
//   };

//   // Pagination logic
//   const indexOfLastMeal = currentPage * mealsPerPage;
//   const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
//   const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);

//   const totalPages = Math.ceil(filteredMeals.length / mealsPerPage);

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   return (
//     <div className="meal-plan-container">
//       <h1 className="headline">Meal Plan</h1>
//       <p className="subtitle">Discover meals tailored to your fitness goals</p>
//       <CategorySelector 
//         onCategorySelect={() => {}} 
//         onValueSelect={handleValueSelect} 
//         onSearch={handleSearch} 
//       />

//       <div className="meal-cards-grid">
//         {currentMeals.map(meal => (
//           <div key={meal.id} className="meal-card">
//             <img src={meal.image_url} alt={meal.name} className="meal-img" />
//             <h3>{meal.name}</h3>
//             <p><strong>Type:</strong> {meal.type}</p>
//             <p><strong>Calories:</strong> {meal.calories} kcal</p>
//             <p><strong>Protein:</strong> {meal.protein}g</p>
//             <p><strong>Carbs:</strong> {meal.carbs}g</p>
//             <p><strong>Fat:</strong> {meal.fat}g</p>
//             <p><strong>Goal:</strong> {meal.goal}</p>
//              <details>
//                <summary>Recipe</summary>
//                <div dangerouslySetInnerHTML={{ __html: meal.recipe }} />
//              </details>
//           </div>
//         ))}
//       </div>

//       <div className="pagination">
//         <button onClick={handlePrevPage} disabled={currentPage === 1}>❮ Prev</button>
//         <span>{currentPage} of {totalPages}</span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next ❯</button>
//       </div>
//     </div>
//   );
// }
// src/features/pages/MealPlan.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import CategorySelector from './MealCategorySelector';
import '../../styles/layout/MealPlan.css';

function asArray(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.rows)) return data.rows;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
}

export default function MealPlan() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 8;

  useEffect(() => {
    axios.get('/api/meals')
      .then(res => {
        const list = asArray(res.data);
        setMeals(list);
        setFilteredMeals(list);
      })
      .catch(err => {
        console.error('Error fetching meals:', err);
        setMeals([]);
        setFilteredMeals([]);
      });
  }, []);

  // category: 'type' | 'calories' | 'protein' | 'goal'
  // value: 'All' 이나 '' 면 전체 복원
  const handleValueSelect = (category, value) => {
    const v = String(value || '').trim();
    if (!v || v.toLowerCase() === 'all') {
      setFilteredMeals(meals);
      setCurrentPage(1);
      return;
    }

    let filtered = meals;
    if (category === 'type') {
      filtered = meals.filter(meal => String(meal.type || '').toLowerCase() === v.toLowerCase());
    } else if (category === 'calories') {
      filtered = meals.filter(meal => {
        const c = Number(meal.calories) || 0;
        if (v === '<300') return c < 300;
        if (v === '300-500') return c >= 300 && c <= 500;
        if (v === '500-700') return c > 500 && c <= 700;
        if (v === '>700') return c > 700;
        return true;
      });
    } else if (category === 'protein') {
      filtered = meals.filter(meal => {
        const p = Number(meal.protein) || 0;
        if (v === '<15g') return p < 15;
        if (v === '15-30g') return p >= 15 && p <= 30;
        if (v === '30-45g') return p > 30 && p <= 45;
        if (v === '>45g') return p > 45;
        return true;
      });
    } else if (category === 'goal') {
      filtered = meals.filter(meal => String(meal.goal || '').toLowerCase() === v.toLowerCase());
    }

    setFilteredMeals(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (searchTerm) => {
    const term = String(searchTerm || '').trim().toLowerCase();
    if (!term) {
      setFilteredMeals(meals);
      setCurrentPage(1);
      return;
    }
    const filtered = meals.filter(meal =>
      String(meal.name || '').toLowerCase().includes(term)
    );
    setFilteredMeals(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil((filteredMeals || []).length / mealsPerPage));
  const start = (currentPage - 1) * mealsPerPage;
  const currentMeals = (filteredMeals || []).slice(start, start + mealsPerPage);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="meal-plan-container">
      <h1 className="headline">Meal Plan</h1>
      <p className="subtitle">Discover meals tailored to your fitness goals</p>

      <CategorySelector
        onCategorySelect={() => {}}
        onValueSelect={handleValueSelect}
        onSearch={handleSearch}
      />

      <div className="meal-cards-grid">
        {(currentMeals || []).map(meal => (
          <div key={meal.id} className="meal-card">
            <img src={meal.image_url} alt={meal.name} className="meal-img" />
            <h3>{meal.name}</h3>
            <p><strong>Type:</strong> {meal.type || '-'}</p>
            <p><strong>Calories:</strong> {meal.calories ?? '-'} kcal</p>
            <p><strong>Protein:</strong> {meal.protein ?? '-'}g</p>
            <p><strong>Carbs:</strong> {meal.carbs ?? '-'}g</p>
            <p><strong>Fat:</strong> {meal.fat ?? '-'}g</p>
            <p><strong>Goal:</strong> {meal.goal || '-'}</p>
            <details>
              <summary>Recipe</summary>
              {/* 서버에서 HTML로 내려오는 경우 대비 */}
              <div dangerouslySetInnerHTML={{ __html: meal.recipe || '' }} />
            </details>
          </div>
        ))}

        {(currentMeals || []).length === 0 && (
          <div className="no-results">No meals found.</div>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>❮ Prev</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next ❯</button>
      </div>
    </div>
  );
}
//