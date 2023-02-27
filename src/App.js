import React, {useEffect} from "react"
import "./main.css"
import {Routes, Route} from "react-router-dom"
import CompleteForm from "./completeForm";
import AOS from "aos";
import "aos/dist/aos.css"
import Main from "./components/main/main";
import AdminAuth from "./components/admin/adminAuth"
import AdminMAin from "./components/admin/adminMain"
import AdminMain from "./components/admin/adminMain";

function App() {

   

  return (
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/main_admin_sv_auth" element={<AdminAuth/>}/>
        <Route path="/main_admin_sv_main" element={<AdminMain/>}/>
      </Routes>
  );
}

export default App;
