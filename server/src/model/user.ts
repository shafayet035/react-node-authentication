import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    validate: {
      validator: function (value) {
        return /[!@#$%^&*(),.?":{}|<>]/.test(value);
      },
      message: 'Password must contain at least one special character',
    },
  },
});

export const User = mongoose.model('User', userSchema);
