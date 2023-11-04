import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  privateKey: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  is_banned: { type: Boolean, default: false },
});

const User = models.User || model("Users", UserSchema);

export default User;
