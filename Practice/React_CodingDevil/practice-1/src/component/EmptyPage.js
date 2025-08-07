import { Link } from "react-router-dom";

export default function EmptyPage() {
  return (
    <>
      <h2>Access Denied.</h2>
      <Link to="/">Back</Link>
    </>
  );
}
