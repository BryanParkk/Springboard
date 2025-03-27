const Machine = (props) => {
  const winner = props.s1 === props.s2 && props.s2 === props.s3;

  return (
    <div className="Machine">
      <b>{props.s1}</b>
      <b>{props.s2}</b>
      <b>{props.s3}</b>

      <p>You {winner ? "win!" : "lose!"}</p>
    </div>
  );
};
