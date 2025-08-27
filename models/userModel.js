const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  createdAt: {
    type: Date,
    immutable: true, // non modifiable
    default: () => Date.now()
  }
}, 
  {timestamps: true} // ADD Auto createdAt et updatedAt}
);

module.exports = mongoose.model('User', userSchema);