import mongoose, { Document, Model, Schema } from 'mongoose';

// Define an interface representing a user document in MongoDB
interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  token: string | null;
}

// Create a schema corresponding to the document interface
const userSchema: Schema<IUser> = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    default: null
  }
});

// Create a model using the schema and interface
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
