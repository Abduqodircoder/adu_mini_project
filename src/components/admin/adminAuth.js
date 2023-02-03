import React, {useState} from 'react';
import "./adminMain.css"
import {useNavigate} from "react-router-dom";

function AdminAuth(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        if (username.trim().length > 0 && password.trim().length > 0){
            localStorage.setItem("username", username);
            localStorage.setItem("password", password)
            if (username === "admin" && password === "admin"){
                navigate("/main_admin_sv_layout")
            }
            else {
                alert("Hato parol")
            }
        }
        else {
            alert("Royhatdan otmading")
        }
    };

    // https://yt3.ggpht.com/a/AATXAJxvHU_V9ATaE-t_2rnF1-O8Kn6CLe1wAt_--w=s900-c-k-c0xffffffff-no-rj-mo

    return (
        <div className="main_admin_page">
            <div className="child_main">
                <div className="logo_company">
                    <img className="img-fluid1"
                         src="https://kpi.andqxai.uz/images/Logo_white.png"
                         alt="Logo"/>
                </div>
                <form>
                    <div className="form_data">
                        <div className="mb-3 mt-3">
                            <label htmlFor="text" className="form-label">Username:</label>
                            <input onChange={(e)=>setUsername(e.target.value)} type="text" className="form-control" id="text" placeholder="Username kiriting" name="text"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">Password:</label>
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="pwd" placeholder="Enter password"
                                   name="pswd"/>
                        </div>
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary d-flex justify-content-end">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminAuth;