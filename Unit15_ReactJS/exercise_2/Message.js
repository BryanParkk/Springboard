function Message(/* TODO: Take the props. */ { props }) {
  return (
    <div>
      <p className="message">{props.children}</p>
    </div>
  );
}
