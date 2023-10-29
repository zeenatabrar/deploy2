const express=require("express")

const {connection}=require("./db")
require("dotenv").config()

const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")
const cors=require("cors")

const app=express()

app.use(cors())

app.use(express.json()) //required while posting

app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to the db")
        console.log(`server is running at port ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
    
})