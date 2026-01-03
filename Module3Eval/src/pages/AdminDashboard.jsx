import { useState,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { RestaurantCard } from "../Components/RestaurantCard";

export const AdminDashboard=()=>{
    const{restaurants,addRestaurant,deleteRestaurant,logout}=useContext(AuthContext);
    const[form,setForm]=useState({
        restaurantName:"",
        address:"",
        type:"North Indian",
        parkingLot:false,
        image:"https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg"
    });
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        const newRestaurant={...form,restaurantID:Date.now(),
            parkingLot:form.parkingLot=== "true" ? true : false
        };
        addRestaurant(newRestaurant);
        setForm({...form,restaurantName:"",address:""});
    };
    return(
        <div>
            <nav style={{padding:"15px",background:"#333",color:"white",display:"flex",justifyContent:"space-between"}}>
                <h2>Admin Dashboard</h2>
                <button onClick={logout} style={{padding:"5px 15px",cursor:"pointer"}}>Logout</button>
            </nav>
            <div style={{flex:1,padding:"20px",border:"1-x solid #ddd",height:"fit-content"}}>
                <h3>Add Restaurant</h3>
                <form onSubmit="{handleSubmit}" style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                    <input name="restaurantName" placeholder="Name" value={form.restaurantName} onChange={handleChange} required/>
                    <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required/>
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
                        <option value="true">Parking Yes</option>
                        <option value="false">Parking No</option>
                    </select>
                    <button type="submit" style={{padding:"10px",background:"green",color:"white",border:"none"}}>Add Restaurant</button>
                </form>
            </div> 
            <div style={{flex:3,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px"}}>
                {restaurants.map((res)=>(
                    <RestaurantCard key={res.restaurantID} data={res} isAdmin={true} onDelete={deleteRestaurant}/>
                ))}
            </div>
        </div>
    )
    };
