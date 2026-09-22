let express =require("express")
let app = express()

let fakeData = [
    {id:1,username:"shaan",password:123456, role:"user"},
    {id:2,username:"rahul",password:789456 , role:"admin"}
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
    
    //storing in localstorage

    if(!user){
       return res.redirect("/loginpage?error=User%20Not%20Found")
    }
    if(user.password!=Number(req.query.password)){
        return res.redirect("/loginpage?error=Invalid%20Password")
    }
    // res.status(200).send("user logged in successfully")
    currentuser = user
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