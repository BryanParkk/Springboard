import dummy from "../db/data.json";

export default function Day() {
  const day = 1;
  const wordList = dummy.words.filter((word) => word.day === day);

  return (
    <>
      <h2>Day {day}</h2>
      <table>
        <tbody>
          {dummy.words.map((word) => (
            <tr>
              <td>{word.eng}</td>
              <td>{word.kor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
