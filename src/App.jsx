import Navbar from "./components/Navbar";
import React from "react";
import { useOutlet } from 'react-router-dom';
import Home from "./pages/home/Home";

export default function App() {
  const outlet = useOutlet()  
  return (
        <React.Fragment>
            <Navbar />
            {outlet || <Home />}
        </React.Fragment>
    );
}
