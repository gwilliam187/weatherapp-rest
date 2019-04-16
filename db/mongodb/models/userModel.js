import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	cityName : {
    type: String
  },
  isPublic : {
    type: boolean
  }
});

const User = mongoose.model('User', userSchema);

export default User;