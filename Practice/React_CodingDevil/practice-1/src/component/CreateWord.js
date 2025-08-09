import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // react-router-dom에서 import 해야 함
import useFetch from "../hooks/useFetch";

export default function CreateWord() {
  const days = useFetch("http://localhost:3001/days");

  const navigate = useNavigate();

  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:3001/words/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: dayRef.current.value,
        eng: engRef.current.value,
        kor: korRef.current.value,
        isDone: false,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Word adding completed.");
        navigate(`/day/${dayRef.current.value}`); // useNavigate로 경로 이동
      }
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>English</label>
        <input type="text" placeholder="computer" ref={engRef} />
        <label>Korean</label>
        <input type="text" placeholder="컴퓨터" ref={korRef} />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {days.map((day) => (
            <option key={day.id} value={day.value}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button>SAVE WORD</button>
    </form>
  );
}
