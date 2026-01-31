const fs=require('fs');;
const logger=(req,res,next)=>{
    const logEntry=`${req.method} | $ {req.originalUrl} | ${new Date().toJSOString()}\n`
    fs.appendFile('logs.txt',logEntry,(err)=>{
        if (err) console.error("Loggong failed",err)
    })
next;
}
const rateLimitStore={};
const  rateLimiter=(req,res,next)=>{
    const  ip=req.ip;
    const  now=Date.now(0);

        if(!rateLimitStore[ip]) rateLimitStore[ip]=[];
        rateLimitStore[ip]=rateLimitStore[ip].filter(t=>now-t<60000);
        if(rateLimitStore[ip].length>=3){
            return res.status(429).json({message:"Too many requests.Limit 3 per minute per IP."})

        }
        rateLimitStore[ip].push(now);
        next();
    }
    const  handle404=(req,res)=>{
        res.status(404).send("This Request Is Not Found")
    }
    module.exports={logger,rateLimiter,handle404}