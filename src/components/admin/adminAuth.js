import React, {useEffect, useState} from 'react';
import "./adminMain.css"
import {useNavigate} from "react-router-dom";
import axios from "axios"
import {BaseUrl} from "../../BaseUrl";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminAuth(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [text, setText] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        notify();
    }, [text]);

    const notify = () => {
        if (text === ""){} else toast.error(text);
        setText("")
    };
    

    const handleSubmit = e => {
        e.preventDefault();
       if (email.trim().length>0 && password.trim().length>0){
           axios.post(BaseUrl+"/api/login", {email:email, password:password}).then(res=>{
               console.log(res.data.user.role)
               console.log(res.data.user)
               if (res.status === 201){
                   if(res.data.user.role === 1){
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("email", res.data.user.email)
                        localStorage.setItem("username", res.data.user.username)
                        localStorage.setItem("id", res.data.user.id)
                        localStorage.setItem("bulim", res.data.user.bulim)
                        navigate("/main_admin_sv_main")
                   }
                   else if(res.data.user.role === 0){
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("email", res.data.user.email)
                    localStorage.setItem("username", res.data.user.username)
                    localStorage.setItem("id", res.data.user.id)
                    localStorage.setItem("bulim", res.data.user.bulim)
                    navigate("/main_admin_sv_main_super")
                   }
               }
           }).catch(err=>{
               console.log(err.response.status)
            //    setText(err.response.data.message[0])
               if(err.response.status === 500){
                setText(err.response.status, err.response.statusText)
               }
               if(err.response.status === 400){
                setText( err.response.data.message[0])
               }
           })
       }else {
           setText("Iltimos fo'rmani toldiring")
       }
    };


    return (
        <div className="main_admin_page">
            <ToastContainer/>
            {/*{JSON.stringify(user)}*/}
            <div className="child_main">
                <div className="logo_company">
                    <img className="img-fluid1"
                         src="https://yt3.ggpht.com/a/AATXAJxvHU_V9ATaE-t_2rnF1-O8Kn6CLe1wAt_--w=s900-c-k-c0xffffffff-no-rj-mo"
                         alt="Logo"/>
                </div>
                <form>
                    <div className="form_data">
                        <div className="mb-3 mt-3">
                            <label htmlFor="text" className="form-label">Email:</label>
                            <input onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" id="text" placeholder="Username kiriting" name="text"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">Password:</label>
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd"/>
                        </div>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary d-flex justify-content-end">
                            Submit
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminAuth;