import React,{createContext,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const[restaurant,setRestaurant]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        const storedData=JSON.parse(localStorage.getItem("evalData"))||[];
        setRestaurant(storedData);
    },[]);
    const login=(email,password)=>{
        if(email==="admin@gmail.com" && password==="admin1234"){
            setUser({role:"admin",email});
            navigate("/admin/dashboard");
            return true;
        }
        else if(email==="customer@gmail.com" && password==="customer1234"){
            setUser({role:"customer",email});
            navigate("/customer/dashboard");
            return true;
        }
        else{
            alert("Invalid credentials");
            return false;
        }
    };
    const logout=()=>{
        setUser(null);
        navigate("/");
    };
    const addRestaurant=(newRestaurant)=>{
        if(!newRestaurant.restaurantName || !newRestaurant.address){
            alert("Please fill in all required fields.");
            return;
        }
        const UpdateList=[...restaurant,newRestaurant];
        setRestaurant(UpdateList);
        localStorage.setItem("evalData",JSON.stringify(UpdateList));
        alert("Restaurant added successfully!");
    };
    const deleteRestaurant=(id)=>{
        if(window.confirm("Are you sure you want to delete this restaurant?")){
            const updateList=restaurant.filter((r)=>r.restaurantID!==id);
            setRestaurant(UpdateList);
            localStorage.setItem("evalData",JSON.stringify(UpdateList));
            alert("Restaurant deleted successfully!");
        };
    };  

    const updateRestaurant=(updatedRestaurant)=>{
        if(window.confirm("Are you sure you want to update this restaurant?")){
            const updateList=restaurant.map((r)=>
            r.restaurantID===updatedRestaurant.restaurantID ? updatedRestaurant : r);
            setRestaurant(updateList);
            localStorage.setItem("evalData",JSON.stringify(updateList));
            alert("Restaurant updated successfully!");
            navigate
        }
    };
    return(
        <AuthContext.Provider value={{user,login,logout,restaurant,addRestaurant,deleteRestaurant,updateRestaurant}}>
            {children}
        </AuthContext.Provider>
    );
};