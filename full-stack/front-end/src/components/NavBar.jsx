import {Link} from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{
        display: "flex",
        justifyContent: "center",
        border: "1px solid black",
        gap: "100px"
    }}>
      <Link to="/home">Home</Link>
      <Link to="/customers">Customers</Link>
    </nav>
  );
}
