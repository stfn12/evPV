import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true, index: true },
  password: { type: String, required: true }
}, { timestamps: true });

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
      name: this.name
    },
    process.env.JWT_SECTRET
  );
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    name: this.name,
    token: this.generateJWT()
  };
};

export default mongoose.model("User", schema);
