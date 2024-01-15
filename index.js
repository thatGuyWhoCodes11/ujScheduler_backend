const express = require('express')
const headerParser = require('./headerParser')
const app = express()

app.use(express.json())
app.post('/getToken',async (req,res)=>{
    try{
        const {ID,PIN} = req.body
        const resPage=await fetch('https://ssb.uj.edu.sa/banprod/twbkwbis.P_WWWLogin',{method:'get'})
        if(!resPage.ok){
            throw new Error('get request to uni failed')
        }
        const headersParsed=headerParser(resPage.headers)
        const resLogin=await fetch('https://ssb.uj.edu.sa/banprod/twbkwbis.P_ValLogin',{method:'POST',body:`sid=${ID}&PIN=${PIN}&ButtonSelected=`,headers:{Cookie:headersParsed['set-cookie']}})
        res.status(200).json({token:headerParser(resLogin.headers)})
    }catch(e){
        console.log(e)
        res.status(500).json({'message':'something went wrong'})
    }
})
app.listen(8080,()=>console.log('server is up'))