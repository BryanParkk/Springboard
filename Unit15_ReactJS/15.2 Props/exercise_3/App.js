function App() {
  return (
    <div>
      <h1>Pokedex</h1>
      <Pokedex />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App></App>);
