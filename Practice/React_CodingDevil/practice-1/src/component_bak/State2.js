import { useState } from "react";
import UserName from "./UserName";

const State = (props) => {
  console.log(props);

  const [name, setName] = useState("Mike");
  return (
    <div>
      <h2>
        {name}({props.age})
      </h2>
      <UserName name={name} />
      <button
        onClick={() => {
          setName(name === "Mike" ? "Jane" : "Mike");
        }}
      >
        Change
      </button>
    </div>
  );
};

export default State;
