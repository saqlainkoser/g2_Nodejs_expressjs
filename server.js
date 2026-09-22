let express =require("express")
let app = express()

let fakeData = [
    {id:1,username:"shaan",password:123456},
    {id:2,username:"rahul",password:789456}
]

let currentuser = null

//middleware
let CheckNotLogin = ((req,res,next)=>{
    if(currentuser==null){
      return res.redirect("/loginpage")
    }

    console.log("Middleware Working")
    next()
})

let CheckLoggedIn = ((req,res,next)=>{
    if(currentuser!=null){
      return res.redirect("/profile")
    }
    console.log("Middleware Working")
    next()
})




app.get("/login",(req,res)=>{
    console.log(req.query);
    let user = fakeData.find((u)=>u.username==req.query.username)
    currentuser = user
    //storing in localstorage

    if(!user){
        res.status(404).send("User Not found")
    }
    if(user.password!=Number(req.query.password)){
        res.status(404).send("invalid password")
    }
    // res.status(200).send("user logged in successfully")
    
    res.redirect("/profile")
    // res.send("data received")
})

app.get("/loginpage",CheckLoggedIn,(req,res)=>{
    res.sendFile( __dirname +"/index.html")
})

//http://localhost:3077/loginpage


app.get("/profile",CheckNotLogin,(req,res)=>{
    res.send(`
        <h1>Welcome ${currentuser.username}<h1>
        <a href="/logout">Logout</a>
        `)
})

app.get("/logout",(req,res)=>{
    currentuser = null
    res.redirect("/loginpage")
})



app.listen(3077,()=>{
    console.log("Server is running on http://localhost:3077")
})