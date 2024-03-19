import mongoose, { Schema,Document} from "mongoose";

interface User extends Document {
    userName: string;
    Age?: number; // Age is now optional and of type number
    Name: string;
    password: string;
}

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email:{
    type:String,
  },
  location:{
    type:String,
  },
 
},
{
  timestamps:true,
});    

const userCollection = mongoose.model<User>("user",userSchema);

export default userCollection;