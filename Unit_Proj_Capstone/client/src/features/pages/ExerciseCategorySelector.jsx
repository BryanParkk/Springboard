import { useMemo, useState } from 'react';
import '../../styles/layout/ExerciseCategorySelector.css';

export default function ExerciseCategorySelector({ data = [], onCategorySelect, onValueSelect, onSearch }) {

  const [selectedValues, setSelectedValues] = useState({
    target_muscle: null,
    equipment: null,
    difficulty: null,
  });

  const categories = [
    { key: 'target_muscle', label: 'Target',     emoji: '🎯' },
    { key: 'equipment',     label: 'Equipment',  emoji: '🏋️' },
    { key: 'difficulty',    label: 'Difficulty', emoji: '⚡'  },
  ];

  // 데이터 없을 때 대비 기본값 (체크 제약 기반)
  const DEFAULTS = {
    target_muscle: ['Abs','Back','Biceps','Cardio','Chest','Forearms','Glutes','Shoulders','Triceps','Upper Legs','Lower Legs'],
    equipment:     ['Body Weight','Bands','Barbell','Bench','Dumbbell','Exercise Ball','EZ Curl Bar','Foam Roll','Kettlebell','Cardio Machine','Strength Machine','Pull up Bar','Weight Plate'],
    difficulty:    ['Beginner','Intermediate','Advanced'],
  };

  const uniq = (arr) => [...new Set(arr.filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b)));

  // 실데이터 기반 옵션 (없으면 DEFAULTS)
  const valuesByCat = useMemo(() => {
    const get = (k) => {
      const vals = uniq((data || []).map(x => x?.[k]));
      return vals.length ? vals : DEFAULTS[k];
    };
    return {
      target_muscle: get('target_muscle'),
      equipment:     get('equipment'),
      difficulty:    get('difficulty'),
    };
  }, [data]);

  const [selected, setSelected] = useState(null);
  const [term, setTerm] = useState('');

  const selectCat = (key) => { setSelected(key); onCategorySelect?.(key); };
  const pickValue = (val) => {
    if (!selected) return;
    setSelectedValues((prev) => ({ ...prev, [selected]: val }));
    onValueSelect?.(selected, val);
  };
  const doSearch = () => onSearch?.(term);

  return (
    <div className="category-selector">
      {/* Search */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search exercises by name / target / equipment / difficulty."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button onClick={doSearch}>Search</button>
      </div>

      <h2>Select a Category</h2>
      <div className="category-buttons">
        {categories.map((c) => (
          <button
                key={c.key}
                className={`category-btn ${selected === c.key ? 'active' : ''} ${selectedValues[c.key] ? 'has-selection' : ''}`}
                onClick={() => selectCat(c.key)}
          >
            <span role="img" aria-label={c.label}>{c.emoji}</span> {c.label}
          </button>
        ))}
      </div>

      {selected && (
        <div className="value-selector">
          <div className="value-buttons">
            {(valuesByCat[selected] || []).map((val) => (
            <button
            key={val}
            className={selectedValues[selected] === val ? 'active' : ''}
            onClick={() => pickValue(val)}
            >
            {val}
            </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}