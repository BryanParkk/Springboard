function Title(props) {
  return (
    <main>
      <h1>{props.title}</h1>
      {props.children}
    </main>
  );
}

function Description({ text }) {
  return <p>{text}</p>;
}

function App() {
  return (
    <Title title="YouTube Channel">
      <Description text="Hello, My name is Bryan" />
    </Title>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
