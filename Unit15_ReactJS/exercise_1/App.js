const programmingLanguages = [
  { language: "JavaScript", devs: 123123123 },
  { language: "Python", devs: 23232323 },
  { language: "Dart", devs: 452456223 },
  { language: "Rust", devs: 984948948 },
  { language: "Assembly", devs: 395867423 },
];

function ProgrammingLanguage({ language, developers }) {
  return (
    <>
      <h1>This programming language is: {language}</h1>
      <p>Current Developers: {developers}</p>
    </>
  );
}

function App() {
  const languageComponent = programmingLanguages.map((data) => {
    return (
      <ProgrammingLanguage
        language={data.language}
        developers={data.devs}
        key={data.language}
      />
    );
  });
  return <main>{languageComponent};</main>;
}
ReactDOM.render(<App />, document.getElementById("root"));
// export default App
