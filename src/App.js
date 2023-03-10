import React, {useEffect} from "react"
import "./main.css"
import {Routes, Route} from "react-router-dom"
import CompleteForm from "./completeForm";
import AOS from "aos";
import "aos/dist/aos.css"
import Main from "./components/main/main";
import AdminAuth from "./components/admin/adminAuth"
import AdminMain from "./components/admin/adminMain";
import SuperAdminMAin from "./components/admin/superAdminMain";

function App() {

   

  return (
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/main_admin_sv_auth" element={<AdminAuth/>}/>
        <Route path="/main_admin_sv_main" element={<AdminMain/>}/>
        <Route path="/main_admin_sv_main_super" element={<SuperAdminMAin/>}/>
      </Routes>
  );
}

export default App;
