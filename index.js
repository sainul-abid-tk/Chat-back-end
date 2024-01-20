const app=require('express')()
const server=require('http').createServer(app)
const io=require('socket.io')(server,{
    cors:{
        origin:"*"
    }
})
const PORT=7000||process.env.PORT

app.get('/',(req,res)=>{
    res.send("<h1>hlooo gyssss</h1>")
})
let users=[]
io.on("connection",(socket)=>{
        console.log(`User Connected:${socket.id}`);
        socket.on("join_room",(id)=>{
            socket.join(id)
            console.log(`User With ID:${socket.id} and Joined Room is:${id}`);
            socket.on("join_user",(data)=>{
                socket.to(id).emit("recive_user",data)
            })
        })
        socket.on("send_message",(data)=>{
            socket.to(data.roomId).emit("receive_message",data)
        })
    
        socket.on("disconnect",()=>{
            console.log("User Disconnected!",socket.id);
            users=[]
        })
    })

server.listen(PORT,()=>{
    console.log(`Iam Listening at port:${PORT}`);
})