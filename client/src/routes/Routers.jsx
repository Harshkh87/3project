import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "../pages/scrollToTop";
import { Toaster } from "react-hot-toast";
import Calculate from '../components/shared/calculate'
import Home from '../components/shared/todo'
import Todo2 from '../components/shared/todo2'
import GST from '../components/shared/gstcalculator'
import TodoServer from '../components/shared/todoserver'
 

const Routers = () => {
  return (
    <React.Suspense>
      {/* <Navbar /> */}
      <Toaster />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculate" element={<Calculate/>} />
        <Route path="/todoSec" element={<Todo2/>} />
        <Route path="/gstcalculator" element={<GST/>} />
        <Route path="/todoserver" element={<TodoServer/>} />
      </Routes>
    </React.Suspense>
  );
};

export default Routers;
