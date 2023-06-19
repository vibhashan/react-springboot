import { useState } from "react";

export default function LoginForm() {
  // Set of state variables for the input fields
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  // handleLogin function
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const login = {
        username: username,
        pwd: pwd,
      };

      const res = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      const resMsg = await res.text();

      if (resMsg === "Login successful") {
        // Redirect to relevant URL
        window.location.replace("http://localhost:3000/home");
      } else {
        // Alert otherwise
        alert(resMsg);
      }
    } catch (err) {
      // Print error message
      console.log(err.message);
    }
  }
  return (
    <>
      <center>
        <h1>LOGIN</h1> <br />
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Password"
            required
            onChange={(e) => setPwd(e.target.value)}
          />
          <br /> <br />
          <button type="submit">LOGIN</button>
        </form>
      </center>
    </>
  );
}
