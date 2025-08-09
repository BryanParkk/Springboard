import { useParams } from "react-router-dom";
import Word from "./Word";
// import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Day() {
  const { day } = useParams();
  // const wordList = dummy.words.filter((word) => word.day === Number(day));
  // const [words, setwWords] = useState([]);
  const words = useFetch(`http://localhost:3001/words?day=${day}`);

  return (
    <>
      <h2>Day {day}</h2>
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}
