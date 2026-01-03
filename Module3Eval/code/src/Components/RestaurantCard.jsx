import React from "react"
import { useNavigate } from "react-router-dom"

export const RestaurantCard=({data, isAdmin, onDelete})=>{
    const navigate=useNavigate();
    return(
        <div style={{border:"1px solid #ccc", padding:"10px",borderRadius:"8px",boxShadow:"0 2px 4px rgba(0,0,0,0,1"}}>
            <img src= {data.image}alt={data.restaurantName} style={{width:"100%",height:"150px",objectFit:"cover",borderRadius:"4px"}}/>
            <h3>{data.restaurantName}</h3>
            <p><strong>Address:</strong> {data.address}</p>
            <p><strong>Type:</strong> {data.type}</p>
            <p><strong>Parking:</strong> {data.parkingLot ? "Available":"Not Available"}</p>
            {isAdmin && (
                <div style={{marginTop:"10px",display:"flex",gap:"10px"}}>
                    <button onClick={()=>onDelete(data.restaurantID)} style={{background:"red",color:"white",padding:"5px 10px",border:"none",cursor:"pointer"}}>
                        Delete
                    </button>
                    <button onClick={()=>navigate(`/admin/restaurants/update`,{state:data})}
                        style={{background:"blue",color:"white",padding:"5px 10px",border:"none",cursor:"pointer"}}>
                            Update
                    </button>
                </div>
            )}
        </div>
    )
}