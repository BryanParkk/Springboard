import React, { useState } from "react";
import NumberItem from './NumberItem';

const NumbersList = () => {
  const [numbers, setNumbers] = useState([2, 5, 7, 11, 12, 18]);

  const remove = (num) => {
    setNumbers(numbers.filter(n => n !== num))
    console.log("REMOVING: ", n);
  }

  return (
    <ul>
      {numbers.map((n) => (
        <NumberItem number={n} remove={remove} key={n}/>
      ))}
    </ul>
  );
};

export default NumbersList;
