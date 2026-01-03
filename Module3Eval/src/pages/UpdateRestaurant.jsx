import { useState,useContext } from "react";
import { useLocation,useContext as useReactContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const UpdateRestaurant=()=>{
    const {state}=useLocation();
    const {UpdateRestaurant}=useReactContext(AuthContext);
    const [form,setForm]=useState({...state,parkingLot:state.parkingLot ? "true" : "false"});
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        UpdateRestaurant({...form,parkingLot:form.parkingLot==="true"});
    };
    return(
        <div style={{padding:"40px",display:"flex",justifyContent:"center"}}>
            <div style={{width:"400px",border:"1px solid #ddd",padding:"20px"}}>
                <h2>Update Restaurant</h2>
                <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"15px"}}>
                    <input name="restaurantName" value={form.restaurantName} onChange={handleChange} required />
                    <input name="address" value={form.address} onChange={handleChange} required />
                    <select name="type" value={form.type} onChange={handleChange}>
                        <option value="Rajasthani">Rajasthani</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Mughlai">Mughlai</option>
                        <option value="Jain">Jain</option>
                        <option value="Thai">Thai</option>
                        <option value="North Indian">North Indian</option>
                        <option value="South Indian">South Indian</option>
                    </select>
                    <select name="parkingLot" value={form.parkingLot} onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <button type="submit" style={{padding:"10px",background:"blue",color:"#fff",border:"none",cursor:"pointer"}}>Update Restaurant</button>
                </form>
            </div>
            </div>
    );
    }