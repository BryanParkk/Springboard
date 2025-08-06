import { useState } from "react";

const State = () => {
  //   let name = "Mike";
  const [name, setName] = useState("Mike");

  function changeName() {
    const newName = name === "Mike" ? "Jane" : "Mike";
    setName(newName);
  }
  return (
    <div>
      <button onClick={changeName}>Change</button>
    </div>
  );
};

export default State;
