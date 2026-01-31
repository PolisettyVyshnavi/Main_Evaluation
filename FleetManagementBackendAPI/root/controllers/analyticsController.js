import { from } from "../config/supabase.js";
const getAnalytics =async(req,res)=>{
    try{
        const getCount=async(table,role=null)=>{
            let query=from(table).select('*',{count:'exact',head:true});
            if(role) query=query.eq('role',role);
            const {count}=await query;
            return count || 0;
        };
    const [customers,owners,drivers,vehicles,trips]=await Promise.all([
        getCount('users','customer'),
        getCount('users','owner'),
        getCount('user','driver'),
        getCount('vehicles'),
        getCount('trips')
    ])
    res.status(200).json({
        "Total customers":customers,
        "Total owners":owners,
        "Total drivers":drivers,
        "Total vehicles":vehicles,
        "Total trips":trips
    });


    }catch(error){
    res.status(500).json({error:"Dashbase error occured"})
        }
}
export default{getAnalytics}