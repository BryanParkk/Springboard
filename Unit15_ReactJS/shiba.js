// import React from "react";
// import ReactDOM from "react-dom/client";

const Shiba = () => {
  return (
    <img
      width="300px"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Taka_Shiba.jpg/1200px-Taka_Shiba.jpg"
    />
  );
};

// ReactDOM.render(<Shiba />, document.getElementById("root")); //
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Shiba />);

const SharPei = () => {
  return (
    <img
      width="300px"
      src="https://m.media-amazon.com/images/I/71L+46v5hnL._AC_SY300_SX300_.jpg"
    />
  );
};

// const App = () => {
//   return (
//     <div>
//       <Shiba />
//       <SharPei />
//       <Shiba />
//     </div>
//   );
// };

const app = ReactDOM.createRoot(document.getElementById("root"));
app.render(<App />);
