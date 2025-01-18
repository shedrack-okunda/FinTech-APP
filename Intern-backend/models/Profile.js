import mongoose from "mongoose";
const { Schema } = mongoose;

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  address: { type: String },
  profilePicture: { type: String },
  dateOfBirth: { type: Date },
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
