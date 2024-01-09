import {Schema, model} from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },    
  },
  password: {
    type: String,
    requered: true
  }
});

userSchema.pre("save", async function(next) {
  const user = this;

  if(!user.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch(e) {
    // statements
    console.log(e);
    throw new Error('Fallo el hash de contraseña');

  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  console.log('hola mundo')
  return await bcryptjs.compare(candidatePassword, this.password);
}

export const User = model('user', userSchema);