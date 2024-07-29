import { BrowserRouter, Route , Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Login } from "./Login";
import { Register } from "./Register";
import { Card } from "./Card";

export const Home = () => {

    return <>
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Card/>
    </>
    </>
}