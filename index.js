// let {add,sub} = require("./utils.js")

// console.log(add(5,6));
// console.log(sub(4,3));

let fs = require("fs")

// fs.writeFile("data.txt","Hello Nodejs",(err)=>{
//     console.log(err)
// })

// fs.readFile("data.txt","utf8",(err,data)=>{
//     console.log(data)
// })

// fs.appendFile("data.txt","\n appended line from node",(err)=>{
//     console.log(err)
// })

fs.unlink("data.txt",(err)=>{
    console.log(err)
})