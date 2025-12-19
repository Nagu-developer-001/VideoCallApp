import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose'
import cors from 'cors';
import connectSocketIO from './src/controllers/socketManager.js';
import userRoutes from './src/routes/userRoute.js';
const app = express();
const server = createServer(app);
const io = connectSocketIO(server);
app.set("port",(process.env.PORT || 3000));
app.use(cors());
app.use(express.json({limit:'40kb'}));
app.use(express.urlencoded({ extended: true, limit:'40kb' }));
app.use('/api/v1/users',userRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const start = async () => {
    const connectDB = await mongoose.connect("mongodb+srv://tvmgroupofltd_db_user:Dv9M7j3GovJOC4fT@appvideocall.9wy5mn8.mongodb.net/?appName=AppVideoCall");
    console.log(`Connected to MongoDB : HOST = ${connectDB.connection.host}`);
    server.listen(app.get("port"),()=>{
    console.log('Server is running on port 3000');
    });
};
start();
