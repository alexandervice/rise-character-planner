const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const {isEmail} = require("validator");

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"]
  },
  img: {
    type: String,
  },
  race: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Races"
    },
  background: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Backgrounds"
    },
  specializations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specializations"
    }],
  talents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Talents"
    }],
  backstory: {
    type: String
  }
}, {timestamps: true});


const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    minlength: [3, "Username must be at least 3 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists within our system"],
    validate: [isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  characters: {
    type: [CharacterSchema],
    default: []
  }
}, {timestamps: true});


// Middleware to create virtual field confirm password
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => this._confirmPassword = value);

// Middleware to validate the password and confirm password match
UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Passwords must match');
  }
  next();
});

// Middleware to hash the password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});


const User = mongoose.model('Users', UserSchema);
// const Character = mongoose.model("Character", CharacterSchema)

module.exports = User;