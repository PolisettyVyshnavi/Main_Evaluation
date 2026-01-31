const  express=require('express');;
const router=express.Router();
const {rateLimiter}=require('../middlewares/appMiddleware.js')

router.post('/',rateLimiter,(req,res)=>{
    res.status(201).json({
        message:"Vehicle created successfully",
        note:"This route is rate limited to 3 requests per unit"
    })
})

module.exports=router