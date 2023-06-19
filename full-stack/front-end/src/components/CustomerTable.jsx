import { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

async function handleDelete(customerID) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/customers/${customerID}`,
      {
        method: "DELETE",
      }
    );

    const resMsg = await res.text();

    alert(resMsg);

    if (resMsg === "Deleted successfully") {
      window.location.reload();
    }
  } catch (error) {
    console.log("Error : " + error.message);
  }
}

export default function CustomerTable() {
  // Use useEffect hook
  useEffect(() => {
    async function getCustomers() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/customers");
        const customers = await res.json();

        if (customers.length === 0) {
          setRows("");
        } else {
          setRows(customers);
        }
      } catch (err) {
        // Print error message
        console.log("Error : " + err.message);
      }
    }

    // Invoke getCustomers function
    getCustomers();
  }, []);

  // State variable
  const [rows, setRows] = useState(null);

  return (
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row) => (
            <tr>
              <td>{row.customerID}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={`/customers/${row.customerID}`}>
                  <button type="button">EDIT</button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(row.customerID);
                  }}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
