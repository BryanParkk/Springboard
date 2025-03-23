// import React from "react";
// import ReactDOM from "react-dom/client";

const Shiba = () => {
  return (
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Taka_Shiba.jpg/1200px-Taka_Shiba.jpg" />
  );
};

// ReactDOM.render(<Shiba />, document.getElementById("root"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Shiba />);
