import { useState } from 'react';

export default function CategorySelector({ onCategorySelect, onValueSelect }) {
  const categories = [
    { key: 'type', label: 'Type', emoji: '🍽️' },
    { key: 'calories', label: 'Calories', emoji: '🔥' },
    { key: 'protein', label: 'Protein', emoji: '💪' },
    { key: 'goal', label: 'Goal', emoji: '🎯' }
  ];

  const [selected, setSelected] = useState(null);

  const handleCategorySelect = (key) => {
    setSelected(key);
    onCategorySelect(key);
  };

  const handleValueSelect = (value) => {
    onValueSelect(selected, value);
  };

  return (
    <div className="category-selector">
      <h2>Select a Category</h2>
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`category-btn ${selected === cat.key ? 'active' : ''}`}
            onClick={() => handleCategorySelect(cat.key)}
          >
            <span role="img" aria-label={cat.label}>{cat.emoji}</span> {cat.label}
          </button>
        ))}
      </div>

      {selected && (
        <div className="value-selector">
          {selected === 'type' && (
            <div className="value-buttons">
              {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((val) => (
                <button key={val} onClick={() => handleValueSelect(val)}>{val}</button>
              ))}
            </div>
          )}

          {selected === 'calories' && (
            <div className="value-buttons">
              {["<300", "300-500", "500-700", ">700"].map((val) => (
                <button key={val} onClick={() => handleValueSelect(val)}>{val} kcal</button>
              ))}
            </div>
          )}

          {selected === 'protein' && (
            <div className="value-buttons">
              {["<15g", "15-30g", "30-45g", ">45g"].map((val) => (
                <button key={val} onClick={() => handleValueSelect(val)}>{val}</button>
              ))}
            </div>
          )}

          {selected === 'goal' && (
            <div className="value-buttons">
              {['Muscle Gain', 'Fat Loss', 'Maintenance'].map((val) => (
                <button key={val} onClick={() => handleValueSelect(val)}>{val}</button>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
