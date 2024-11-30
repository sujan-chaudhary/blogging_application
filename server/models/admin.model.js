import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['admin', 'superadmin', "author"],
        default: 'admin',
      },
})

adminSchema.pre("save", async function (next){
  if(!this.isModified("password")) return next();

  try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
  catch(err){
    next(err);
  }
});

adminSchema.methods.comparePassword = async function (candidatePassword){
  return bcrypt.compare(candidatePassword, this.password);
}

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;