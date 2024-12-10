import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import ContactUs from "./pages/ContactUs";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const App=()=>{
   const isAuthenticated = false;
   return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated}/>
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
     </Routes>
    </BrowserRouter>
   )
}

export default App;