import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password :{
        type:String,
        required:true,
    },
    avatar:{
        type: String,
        default: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAtAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgMEAQUH/8QAKxABAAIBAQgBBAEFAAAAAAAAAAECAxEEEiExMkFRYXETUoGhMxQiI0KS/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAAADkzoDojvx5N+vkEhGLRM84SAAAAAAAAAAAAAAAAARteK/KF79o5eUASm8z6jwj3AAAB2J05OALIyfcnEx2UO1mazwBeOVtFnQAAAAAAAAAAFWS2vCOXdO86V9qQAAAcmdI1nhAOii200if7dbORtUfZ+waBDHlpfhWePiUwAAInSdYX1nWFCWO27OnaQXAAAAAAAAA5M6QCq8629IgAAB7Yc2X6luHT2hp2m27i4c5mGIABUG3Bl+pGk9UMSzZ7buWvvgitwAAALqTrVJVjnstAAAAAAARv0ykjk6ZBSAAACja/4o+WRuz138UxHbiwqAAgni/kr8oLdmrvZY9cQbQEUABLH1rlNOqFwAAAAAACNuUpAM47MaTo4AAAyZ8M1nWka18eGtybRHOYj5kHnDdamG3Gd3X1KP0sPmP+gZaVm86VjVtxY4x10jjPeXazSI0iax8SkAAAACeLqWoYo4apgAAAAAAAAryR3hWvmOGim0bs6A4hkyRjrrP4jyn7nk8/Jeclt6fwCWTNe/OdI8QrBUNDQANI8O1mazrXhPpwBqw7RrO7knjPKWh5rXst96kxPOqKvIiZmIgWY66cQTjhDoAAAAAAAAAOWrvQ6AybTrXFbWGB6+THXJXdtHB5+bZr4516q+YUUB21BAAAABbs0/5ojzzV0ra9tKxMz6btm2SKTv3nW3jtALqU7ytBFAAAAAAAAAAAAAAU5dmxZJ1mNLeYZ77DP+l4/MNwDzP6TN4ifiSNkzfb+3pgPOrseSec1j9rsexUjrtNv01gI1pWkaViIj0kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z"
    },

},{timestamps:true} );

const User = mongoose.model("User", userSchema);
export default User;
