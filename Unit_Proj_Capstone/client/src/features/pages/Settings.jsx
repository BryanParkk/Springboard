import { useEffect, useState } from 'react';
import api from '../../api/client';
import '../../styles/layout/Settings.css';

const SEX = ['male','female','other','prefer_not_say'];
const GOAL = ['bulking','cutting','maintenance','recomp','tone'];
// const THEME = ['light','dark','system'];

const toKg = (val, unit) => val == null ? null : unit === 'lbs' ? +(val / 2.2046226218).toFixed(1) : +(+val).toFixed(1);
const fromKg = (kg, unit) => kg == null ? '' : unit === 'lbs' ? +(kg * 2.2046226218).toFixed(1) : +(+kg).toFixed(1);
const toCm = (val, unit) => val == null ? null : unit === 'in' ? +(val * 2.54).toFixed(1) : +(+val).toFixed(1);
const fromCm = (cm, unit) => cm == null ? '' : unit === 'in' ? +(cm / 2.54).toFixed(1) : +(+cm).toFixed(1);

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [profile, setProfile] = useState({
    name: '', sex: '', birthday: '',
    weight_unit: 'kg', height_unit: 'cm', distance_unit: 'km', theme_mode: 'light',
    current_weight: '', goal_weight: '', height_value: '',
    goal_body_type: ''
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const me = await api.get('/api/user');
        const u = me.data || {};
        const weightUnit = u.weight_unit || 'kg';
        const heightUnit = u.height_unit || 'cm';
        setProfile({
          name: u.name || '',
          sex: u.sex || '',
          birthday: u.birthday || '',
          weight_unit: weightUnit,
          height_unit: heightUnit,
          distance_unit: u.distance_unit || 'km',
          theme_mode: u.theme_mode || 'light',
          current_weight: fromKg(u.current_weight_kg, weightUnit),
          goal_weight: fromKg(u.goal_weight_kg, weightUnit),
          height_value: fromCm(u.current_height_cm, heightUnit),
          goal_body_type: u.goal_body_type || ''
        });
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onChange = (k) => (e) => setProfile((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true); setError('');
      const payload = {
        name: profile.name || null,
        sex: profile.sex || null,
        birthday: profile.birthday || null,
        weight_unit: profile.weight_unit,
        height_unit: profile.height_unit,
        distance_unit: profile.distance_unit,
        theme_mode: 'light', // 라이트만 사용
        goal_body_type: profile.goal_body_type || null,
        current_weight_kg: profile.current_weight !== '' ? toKg(+profile.current_weight, profile.weight_unit) : null,
        goal_weight_kg:    profile.goal_weight    !== '' ? toKg(+profile.goal_weight,    profile.weight_unit) : null,
        current_height_cm: profile.height_value   !== '' ? toCm(+profile.height_value,   profile.height_unit) : null,
      };
      await api.put('/api/user', payload);
      alert('Saved!');
    } catch {
      setError('Save failed');
    } finally { setSaving(false); }
  };

  if (loading) return <p className="settings-loading">Loading...</p>;

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h2 className="headline">Journey Settings</h2>
        <p className="subtitle">Set your personal information, measurement units, and theme.</p>
      </header>

      {error && <p className="settings-error">{error}</p>}

      <form className="settings-form" onSubmit={onSubmit}>
        <section className="settings-card">
          <h3 className="card-title">Profile</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" value={profile.name} onChange={onChange('name')} />
            </div>
            <div className="form-group">
              <label className="form-label">Birthday</label>
              <input className="form-input" type="date" value={profile.birthday || ''} onChange={onChange('birthday')} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Sex</label>
              <select className="form-select" value={profile.sex || ''} onChange={onChange('sex')}>
                <option value="">(select)</option>
                {SEX.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Body Goal</label>
              <select className="form-select" value={profile.goal_body_type || ''} onChange={onChange('goal_body_type')}>
                <option value="">(select)</option>
                {GOAL.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <h3 className="card-title">Measurements</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Current Weight</label>
              <input className="form-input" type="number" step="0.1" value={profile.current_weight} onChange={onChange('current_weight')} />
            </div>
            <div className="form-group">
              <label className="form-label">Goal Weight</label>
              <input className="form-input" type="number" step="0.1" value={profile.goal_weight} onChange={onChange('goal_weight')} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Current Height</label>
              <input className="form-input" type="number" step="0.1" value={profile.height_value} onChange={onChange('height_value')} />
            </div>
            <div className="form-group">
              <label className="form-label">Height Unit</label>
              <select className="form-select" value={profile.height_unit} onChange={onChange('height_unit')}>
                <option value="cm">cm</option>
                <option value="in">in</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Weight Unit</label>
              <select className="form-select" value={profile.weight_unit} onChange={onChange('weight_unit')}>
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Distance Unit</label>
              <select className="form-select" value={profile.distance_unit} onChange={onChange('distance_unit')}>
                <option value="km">km</option>
                <option value="mi">mi</option>
              </select>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <h3 className="card-title">Appearance</h3>
          <div className="form-row one">
            <div className="form-group">
              <label className="form-label">Theme</label>
              <select className="form-select" value="light" disabled>
                <option value="light">light</option>
              </select>
              <p className="card-hint">Light mode only is currently supported.</p>
            </div>
          </div>
        </section>

        <div className="actions">
          <button type="button" className="btn btn-outline" onClick={() => window.location.reload()}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving} onClick={() => window.location.reload()}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}