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

export default function MealPlan() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 8;

  useEffect(() => {
    axios.get('/api/meals')
      .then(res => {
        const list = Array.isArray(res.data) ? res.data : [];
        setMeals(list);
        setFilteredMeals(list);
      })
      .catch(err => console.error('Error fetching meals:', err));
  }, []);

  // 카테고리 선택 (All/빈값이면 전체 복원)
  const handleValueSelect = (category, value) => {
    const v = String(value || '').trim();
    if (!v || v.toLowerCase() === 'all') {
      setFilteredMeals(meals);
      setCurrentPage(1);
      return;
    }

    let filtered = meals;

    if (category === 'type') {
      filtered = meals.filter(m => (m.type || '') === v);
    } else if (category === 'goal') {
      filtered = meals.filter(m => (m.goal || '') === v);
    } else if (category === 'calories') {
      // 라벨 기준: '<300' | '300-500' | '500-700' | '>700'
      if (v === '<300') filtered = meals.filter(m => Number(m.calories) < 300);
      else if (v === '300-500') filtered = meals.filter(m => Number(m.calories) >= 300 && Number(m.calories) <= 500);
      else if (v === '500-700') filtered = meals.filter(m => Number(m.calories) > 500 && Number(m.calories) <= 700);
      else if (v === '>700') filtered = meals.filter(m => Number(m.calories) > 700);
    } else if (category === 'protein') {
      // 라벨 기준: '<15g' | '15-30g' | '30-45g' | '>45g'
      if (v === '<15g') filtered = meals.filter(m => Number(m.protein) < 15);
      else if (v === '15-30g') filtered = meals.filter(m => Number(m.protein) >= 15 && Number(m.protein) <= 30);
      else if (v === '30-45g') filtered = meals.filter(m => Number(m.protein) > 30 && Number(m.protein) <= 45);
      else if (v === '>45g') filtered = meals.filter(m => Number(m.protein) > 45);
    }

    setFilteredMeals(filtered);
    setCurrentPage(1);
  };

  // 검색 (이름 기준, 필요하면 설명 확장 가능)
  const handleSearch = (searchTerm) => {
    const term = String(searchTerm || '').trim().toLowerCase();
    if (!term) { setFilteredMeals(meals); setCurrentPage(1); return; }
    const filtered = meals.filter(m => (m.name || '').toLowerCase().includes(term));
    setFilteredMeals(filtered);
    setCurrentPage(1);
  };

  // 페이지네이션
  const totalPages = Math.max(1, Math.ceil(filteredMeals.length / mealsPerPage));
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(p => p + 1);

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
        {currentMeals.map(meal => (
          <div key={meal.id} className="meal-card">
            <img src={meal.image_url} alt={meal.name} className="meal-img" />
            <h3>{meal.name}</h3>
            <p><strong>Type:</strong> {meal.type || '-'}</p>
            <p><strong>Calories:</strong> {meal.calories ?? '-'} kcal</p>
            <p><strong>Protein:</strong> {meal.protein ?? '-'}g</p>
            <p><strong>Carbs:</strong> {meal.carbs ?? '-'}g</p>
            <p><strong>Fat:</strong> {meal.fat ?? '-'}g</p>
            <p><strong>Goal:</strong> {meal.goal || '-'}</p>
            {meal.recipe && (
              <details>
                <summary>Recipe</summary>
                <div dangerouslySetInnerHTML={{ __html: meal.recipe }} />
              </details>
            )}
          </div>
        ))}
        {currentMeals.length === 0 && (
          <div className="empty-state">No meals found.</div>
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
