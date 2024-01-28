import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true,
        unique: true
    },
    email:{
        type: String,
        require:true,
        unique: true
    },
    password:{
        type: String,
        require:true,
        
    },
    avata:{
        type:String,
        default:"https://www.google.com/url?sa=i&https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fprofile&psig=AOvVaw0_EVLQHzDWYj5UK4QVkoNW&ust=1706503732203000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLDWg_yj_4MDFQAAAAAdAAAAABAD"
    }

} ,{timestamps:true})

const User = mongoose.model('User', userSchema)
export default User
