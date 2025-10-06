import { useEffect, useState } from 'react';
import axios from 'axios';
import ExerciseCategorySelector from './ExerciseCategorySelector';
import '../../styles/layout/ExercisesGuide.css';

export default function ExercisesGuide() {
  const [exercises, setExercises] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    axios.get('/api/exercises')
      .then(res => {
        const list = res.data || [];
        setExercises(list);
        setFiltered(list);
      })
      .catch(err => console.error('Error fetching exercises:', err));
  }, []);

  // 카테고리 값 선택 (target_muscle / equipment / difficulty)
  const handleValueSelect = (category, value) => {
    const v = (value || '').toLowerCase();
    const out = exercises.filter(x => (x?.[category] || '').toLowerCase() === v);
    setFiltered(out);
    setCurrentPage(1);
  };

  // 검색 (이름 + 보조 필드)
  const handleSearch = (term) => {
    const t = (term || '').trim().toLowerCase();
    if (!t) { setFiltered(exercises); setCurrentPage(1); return; }
    const out = exercises.filter(x => {
      const fields = [x.name, x.target_muscle, x.equipment, x.difficulty, x.description]
        .map(v => (v || '').toLowerCase());
      return fields.some(f => f.includes(t));
    });
    setFiltered(out);
    setCurrentPage(1);
  };

  // 페이지네이션
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (currentPage - 1) * perPage;
  const curr = filtered.slice(start, start + perPage);
  const prev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const next = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="exercise-guide-container">
      <h1 className="headline">Exercise Guide</h1>
      <p className="subtitle">Find the best exercise guide tailored for you</p>

      <ExerciseCategorySelector
        data={exercises}
        onCategorySelect={() => {}}
        onValueSelect={handleValueSelect}
        onSearch={handleSearch}
      />

      {/* Meal Plan의 4열 그리드 재사용하려면 아래처럼 클래스 두 개 모두 부여 */}
      <div className="exercise-cards-grid meal-cards-grid">
        {curr.map(ex => (
          <div key={ex.id} className="exercise-card">
            <img className="exercise-img" src={ex.image_url} alt={ex.name} />
            <h3>{ex.name}</h3>
            <p><strong>Target:</strong> {ex.target_muscle || '-'}</p>
            <p><strong>Equipment:</strong> {ex.equipment || '-'}</p>
            <p><strong>Difficulty:</strong> {ex.difficulty || '-'}</p>
          </div>
        ))}
        {curr.length === 0 && <div className="no-results">No exercises found.</div>}
      </div>

      <div className="pagination">
        <button onClick={prev} disabled={currentPage === 1}>❮ Prev</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={next} disabled={currentPage === totalPages}>Next ❯</button>
      </div>
    </div>
  );
}