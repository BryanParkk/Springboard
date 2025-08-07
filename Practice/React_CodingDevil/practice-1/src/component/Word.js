import { useState } from "react";

export default function Word({ word }) {
  const [isEnable, setEnable] = useState(false);
  const [isDone, setDone] = useState(word.isDone);

  function toggleEnable() {
    setEnable(!isEnable);
  }

  function toggleDone() {
    setDone(!isDone);
  }

  return (
    <tr className={isDone ? "off" : ""}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isEnable && word.kor}</td>
      <td>
        <button onClick={toggleEnable}>{isEnable ? "Hide" : "Show"}</button>
        <button className="btn_del">Delete</button>
      </td>
    </tr>
  );
}
