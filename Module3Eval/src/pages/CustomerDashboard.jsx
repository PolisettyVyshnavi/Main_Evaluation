import { useState,useContext, useRef,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { RestaurantCard } from "../Components/RestaurantCard";

export const CustomerDashboard=()=>{
    const{restaurants,logout}=useContext(AuthContext);
    const searchInputRef=useRef(null);
    const [filteredData,setFilteredData]=useState([]);
    const[filters,setFilters]=useState({
        search:"",
        type:"",
        parkingLot:""
    });
    useEffect(()=>{
        let data=restaurants;
        if(filters.search){
            const lowerSearch=filters.search.toLowerCase();
            data=data.filter(item=>
                item.restaurantName.toLowerCase().includes(lowerSearch) || 
                item.address.toLowerCase().includes(lowerSearch)
            );
        }
        if(filters.type){
            data=data.filter(item=>item.type===filters.type);
        }
        if(filters.parkingLot){
            const isParking=filters.parkingLot==="true";
            data=data.filter(item=>String(item.parkingLot)===String(isParking));
        }
        setFilteredData(data);
    },[filters,restaurants]);
    const handleSearchChange=(e)=>{
        setFilters({...filters,[e.target.name]: e.target.value});
    };
    return(
        <div>
            <nav style={{padding:"15px",background:"#333",color:"#fff",gap:"15px",alignItems:"center",flexWrap:"wrap"}}>
                <h2>Food App</h2>
                <input ref={searchInputRef} name="search" placeholder="Search by name or address..." onChange={handleSearchChange} style={{padding:"5px",flex:1}} />
                <select name="type" onChange={handleSearchChange} style={{padding:"5px"}}>
                    <option value="">All Types</option>
                    <option value="Rajasthani">Rajasthani</option>
                    <option value="Gujarati">Gujarati</option>  
                    <option value="Mughlai">Mughlai</option>
                    <option value="Jain">Jain</option>
                    <option value="Thai">Thai</option>  
                    <option value="North Indian">North Indian</option>
                    <option value="South Indian">South Indian</option>
                </select>
                <select name="parkingLot" onChange={handleSearchChange} style={{padding:"5px"}}>
                    <option value="">Any Parking</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <button onClick={logout} style={{marginLeft:"auto",padding:"5px 10px"}}>Logout</button>
            </nav>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)", gap:"20px",padding:"20px"}}>
                {filteredData.map((res)=>(
                    <RestaurantCard key={res.restaurantID} data={res} isAdmin={false} />
                ))}
            </div>
        </div>
    )
    }