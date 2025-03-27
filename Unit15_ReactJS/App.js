const App = () => {
  return (
    <div>
      {
        <>
          <Animal name="Mayfly" species="chicken" emoji="🐥" />
          <Animal name="SUTY" species="dog" emoji="🐕" />
          <Animal name="Doggy" species="Wolf" emoji="🐺" />
          <RandomNum />
          <RandomNum />
          <RandomNum />
          <RandomNum />
          <Machine s1="❤️" s2="❤️" s3="❤️" />
        </>
      }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
