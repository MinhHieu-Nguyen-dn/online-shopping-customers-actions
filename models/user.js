import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    phone: String
})

export const User = mongoose.model('user', userSchema);