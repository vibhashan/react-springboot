import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerPage from "./pages/Customerpage";
import NewCustomerPage from "./pages/NewCustomerPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import LoginForm from "./components/LOginForm";
import Homepage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/customers" element={<CustomerPage />}></Route>
        <Route path="/customers/new" element={<NewCustomerPage />}></Route>
        <Route path="/customers/:id" element={<EditCustomerPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
