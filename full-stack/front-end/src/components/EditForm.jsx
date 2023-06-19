import { useEffect, useReducer } from "react";

// reducer function
function reducer(state, action) {
  switch (action.type) {
    case "id": {
      console.log(action.value);
      return {
        id: action.value,
        name: state.name,
        age: state.age,
      };
    }

    case "name": {
      return {
        id: state.id,
        name: action.value,
        age: state.age,
      };
    }

    case "age": {
      return {
        id: state.id,
        name: state.name,
        age: action.value,
      };
    }

    case "data": {
      return {
        id: action.value.customerID,
        name: action.value.name,
        age: action.value.age,
      };
    }

    case "nothing": {
      return {
        id: action.value.id,
        name: action.value.name,
        age: action.value.age,
      };
    }
  }
}

export default function EditForm() {
  useEffect(() => {
    async function getCustomerData() {
      try {
        const customerID = window.location.pathname.split("/")[2];
        const res = await fetch(
          `http://localhost:5000/api/v1/customers/${customerID}`
        );

        const customer = await res.json();

        if (customer === null) {
          dispatch({
            type: "nothing",
            value: {
              id: "",
              name: "",
              age: "",
            },
          });
        } else {
          dispatch({
            type: "data",
            value: customer,
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    getCustomerData();
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    id: 0,
    name: "",
    age: 0,
  });

  async function handleSave(e) {
    e.preventDefault();

    try {
      const customerID = window.location.pathname.split("/")[2];

      const customer = {
        customerID: state.id,
        name: state.name,
        age: state.age,
      };

      const res = await fetch(
        `http://localhost:5000/api/v1/customers/${customerID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        }
      );

      const resMsg = await res.text();

      alert(resMsg);
    } catch (error) {
      console.log("Error : " + error.message);
    }
  }

  return (
    <form onSubmit={handleSave}>
      <input
        type="number"
        placeholder="Customer ID"
        value={state.id}
        disabled
        onChange={(e) => {
          dispatch({
            type: "id",
            value: e.target.value,
          });
        }}
      />{" "}
      <br />
      <br />
      <input
        type="text"
        placeholder="Name"
        value={state.name}
        required
        onChange={(e) => {
          dispatch({
            type: "name",
            value: e.target.value,
          });
        }}
      />{" "}
      <br />
      <br />
      <input
        type="number"
        placeholder="Age"
        value={state.age}
        required
        onChange={(e) => {
          dispatch({
            type: "age",
            value: e.target.value,
          });
        }}
      />{" "}
      <br />
      <br />
      <button type="submit">SAVE</button>
    </form>
  );
}
