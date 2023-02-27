import React, {useEffect, useState} from "react"
import {Route, Routes, useNavigate} from "react-router-dom";
import Main from "./components/main/main";
import AdminAuth from "./components/admin/adminAuth";
import AdminMain from "./components/admin/adminMain";

function App() {

    const navigate = useNavigate()

  return (
      <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/main_admin_sv_auth" element={<AdminAuth/>}/>
            <Route path="/main_admin_sv_main" element={<AdminMain/>}/>
        </Routes>
  );
}

export default App;
