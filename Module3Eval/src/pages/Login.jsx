import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
export const Login=()=>{
    const[creds,setCreds]=useState({email:"",password:""});
    const{login}=useContext(AuthContext);
    const handleChange=(e)=>{
        setCreds({...creds,[e.target.name]:e.target.value});
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        login(creds.email,creds.password);
    };
    return(
        <div style={{padding:"50px", maxWidth:"400px",margin:"auto",textAlign:"center"}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"15px"}}>
                <input name="email" type="email" placeholder="Enter Email" onChange={handleChange} required style={{padding:"10px",fontSize:"16px"}}/>
                <input name="password" type="password" placeholder="Enter Password" onChange={handleChange} required style={{padding:"10px",fontSize:"16px"}}/>
                <button type="submit" style={{padding:"10px",cursor:"pointer"}}>Login</button>
            </form>
        </div>
    )
};