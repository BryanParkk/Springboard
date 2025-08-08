import { useState } from "react";

export default function Word({ word: w }) {
  const [word, setWord] = useState(w);
  const [isEnable, setEnable] = useState(false);
  const [isDone, setDone] = useState(word.isDone);

  function toggleEnable() {
    setEnable(!isEnable);
  }

  function toggleDone() {
    // setDone(!isDone);
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...word,
        isDone: !isDone,
      }),
    }).then((res) => {
      if (res.ok) {
        setDone(!isDone);
      }
    });
  }

  function del() {
    if (window.confirm("Would you like to delete this word?")) {
      fetch(`http://localhost:3001/words/${word.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          setWord({ id: 0 });
        }
      });
    }
  }
  if (word.id === 0) {
    return null;
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
        <button className="btn_del" onClick={del}>
          Delete
        </button>
      </td>
    </tr>
  );
}
