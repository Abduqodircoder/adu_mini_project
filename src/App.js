import React, {useEffect} from "react"
import {Route, Routes} from "react-router-dom";
import Main from "./components/main/main";
import AdminAuth from "./components/admin/adminAuth";
import AdminMain from "./components/admin/adminMain";

function App() {

  return (
      <>
          <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/main_admin_sv_auth" element={<AdminAuth/>}/>
              <Route path="/main_admin_sv_layout" element={<AdminMain/>}/>
          </Routes>
      </>
  );
}

export default App;
