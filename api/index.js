import express, { response } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import authRouter from './routes/auth.route.js'
dotenv.config();

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json())

app.listen(3000, () => {
  console.log("Server running on port 3000!!!");
});

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((error,request,response,next) =>{
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internet Sever Error'
    return response.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})