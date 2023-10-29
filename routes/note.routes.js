const express=require("express")
const {NoteModel}=require("../model/note.model")
const {auth}=require("../middleware/auth.middleware")

const noteRouter=express.Router()

noteRouter.use(auth)

noteRouter.post("/create",async(req,res)=>{
try {
    const note=new NoteModel(req.body)
    await note.save()
    res.status(200).send({"msg":"A new notes has been registered"})
} catch (err) {
    res.status(400).send({"error":err})
}
})

noteRouter.get("/",async(req,res)=>{
    try {
        const notes=await NoteModel.find({username:req.body.username})
        res.status(200).send(notes)
    } catch (err) {
        res.status(400).send({"error":err})
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const note=await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.userID==note.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).send({"msg":`The note with the ID:${noteID} has been updated`})
        }else{
            res.status(200).send({"msg":"you are not authorised!"})
        }
    } catch (err) {
     res.status(400).send({"error":err})   
    }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const note=await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.userID==note.userID){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({"msg":`The note with the ID:${noteID} has been deleted`})
        }else{
            res.status(200).send({"msg":"you are not authorised!"})
        }
    } catch (err) {
     res.status(400).send({"error":err})   
    }
})

module.exports={
    noteRouter
}