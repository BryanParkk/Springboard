// src/features/components/NumberInputStepper.jsx
import React, { useRef } from "react";
import '../../styles/components/NumberInputStepper.css'

/**
 * Drop-in 대체용 숫자 스테퍼
 * - onChange는 기존 input과 동일하게 e.target.value 형태로 전달
 * - 직접 타이핑, -, . 등 중간 상태 허용 -> blur 시 보정/클램프
 */
export default function NumberInputStepper({
  value,
  onChange,
  step = 1,
  min = -Infinity,
  max = Infinity,
  decimals,                 // 0.5 표기를 위해 1 등으로 지정 가능
  placeholder,
  className = "",
  disabled = false,
  name,
  id,
  ariaLabel = "Number input",
  style,
}) {
  const holdT = useRef(null);
  const holdI = useRef(null);

  const emit = (next) => {
    onChange?.({ target: { value: next } });
  };

  const clamp = (v) => Math.min(max, Math.max(min, v));
  const fmt = (v) =>
    typeof decimals === "number" ? Number(v.toFixed(decimals)) : v;

  const toNum = (v) => {
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  };

  const setNumeric = (n) => {
    if (n === null) return;               // ignore invalid
    emit(fmt(clamp(n)));
  };

  const inc = () => {
    const base = toNum(value) ?? 0;
    setNumeric(base + step);
  };

  const dec = () => {
    const base = toNum(value) ?? 0;
    setNumeric(base - step);
  };

  const startHold = (fn) => {
    if (disabled) return;
    fn(); // 1회 즉시
    holdT.current = setTimeout(() => {
      holdI.current = setInterval(fn, 60);
    }, 300);
  };
  const stopHold = () => {
    clearTimeout(holdT.current);
    clearInterval(holdI.current);
  };

  const onInput = (e) => {
    const raw = e.target.value;
    // 입력 중간 상태 허용: '', '-', '.', '-.', '1.'
    if (/^-?$/.test(raw) || /^\.$/.test(raw) || /^-?\d+\.$/.test(raw)) {
      return emit(raw);
    }
    // 정상 숫자면 그대로 전달
    if (!Number.isNaN(Number(raw))) return emit(raw);
  };

  const onBlur = () => {
    const n = toNum(value);
    if (n === null) {
      emit(""); // 비웠다면 그대로 비움
    } else {
      setNumeric(n); // clamp + decimals 보정
    }
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "ArrowUp") { e.preventDefault(); inc(); }
    if (e.key === "ArrowDown") { e.preventDefault(); dec(); }
    if (e.key === "PageUp") { e.preventDefault(); setNumeric((toNum(value) ?? 0) + step * 5); }
    if (e.key === "PageDown") { e.preventDefault(); setNumeric((toNum(value) ?? 0) - step * 5); }
  };

  const onWheel = (e) => {
    // 테이블 포커스 이동 중 실수 방지: 휠로 값 변경 막음
    e.currentTarget.blur();
  };

  return (
    <div className={`ni ${className}`} style={style} data-disabled={disabled || undefined}>
      <button
        type="button"
        className="ni__btn ni__btn--dec"
        aria-label="Decrease"
        onMouseDown={() => startHold(dec)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={() => startHold(dec)}
        onTouchEnd={stopHold}
        disabled={disabled}
      >
        –
      </button>

      {/* type='text'로 스피너 제거, inputMode로 숫자 키패드 유도 */}
      <input
        type="text"
        inputMode="decimal"
        role="spinbutton"
        className="ni__input"
        name={name}
        id={id}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-valuemin={isFinite(min) ? min : undefined}
        aria-valuemax={isFinite(max) ? max : undefined}
        aria-valuenow={toNum(value) ?? undefined}
        value={value}
        onChange={onInput}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onWheel={onWheel}
        disabled={disabled}
      />

      <button
        type="button"
        className="ni__btn ni__btn--inc"
        aria-label="Increase"
        onMouseDown={() => startHold(inc)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={() => startHold(inc)}
        onTouchEnd={stopHold}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
}