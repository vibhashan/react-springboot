import CustomerTable from "../components/CustomerTable";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

export default function CustomerPage() {
  return (
    <>
      <center>
        <NavBar />
        <h1>Customers</h1>

        <Link to="/customers/new">
          <button type="button">ADD</button>
        </Link>

        <br /><br />

        <CustomerTable />

      </center>
    </>
  );
}
