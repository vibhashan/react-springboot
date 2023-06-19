import { useReducer } from "react";

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

    case "reset": {
      return {
        id: "",
        name: "",
        age: "",
      };
    }
  }
}

export default function NewForm() {
  const [state, dispatch] = useReducer(reducer, {
    id: "",
    name: "",
    age: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const customer = {
        customerID: state.id,
        name: state.name,
        age: state.age,
      };

      const res = await fetch("http://localhost:5000/api/v1/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      const resMsg = await res.text();

      if (resMsg === "Added successfully") {
        dispatch({
          type: "reset",
        });
      }

      alert(resMsg);
    } catch (error) {
      console.log("Error : " + error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Customer ID"
        value={state.id}
        required
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
