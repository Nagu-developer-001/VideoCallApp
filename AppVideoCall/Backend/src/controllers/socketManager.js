import { Server } from 'socket.io';


let connections = {};
let messages = {};
let timeOnline = {};

const connectSocketIO = (server) => {
    const io = new Server(server);

    io.on('connection',(socket)=>{
        socket.on('join',(data)=>{
            if(connections[data]===undefined){
                connections[data] = [];
            }
            connections[data].push(socket.id);
            timeOnline[socket.id] = Date.now();

            for(let i=0;i<connections[data].length;i++){
                io.to(connections[data][i]).emit("user-joined",socket.id,connections[data]);
            }
            if(messages[data]===undefined){
                for(let i=0;i<messages[data].length;i++){
                    io.to(socket.id).emit('chat-message',messages[data][i]['data'],
                    messages[data][i]['sender'],messages[data][i]['socket-id-sender']);
            }
        }
        });
        socket.on('signal',(told,message)=>{
            io.to(told).emit('signal',sockets.id,message);
        });
        socket.on('chat-message',(data,sender)=>{
            const [matchingRoom,found] = Object.entries(connections)
            .reduce(([room,isFound],[roomKey,roomValue])=>{
                if(!isFound && roomValue.includes(socket.id)){
                    return [roomKey,true];
                }
                return [room,isFound];
            }, ['',false]);
        });
        if(found===true){
            if(messages[matchingRoom]===undefined){
                messages[matchingRoom] = [];
            }
            messages[matchingRoom].push({'sender':sender,'data':data,'socket-id-sender':socket.id});
            connections[matchingRoom].forEach((elem)=>{
                io.to(elem).emit('chat-message',data,sender,socket.id);
            });
        
            socket.on('disconnect',()=>{
                
        });
    };
});
    return io;
}

export default connectSocketIO;