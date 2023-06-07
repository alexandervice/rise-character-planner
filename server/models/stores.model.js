const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"]
    },
    storeNumber: {
      type: Number,
      required: [true, "Store Number is required"],
      min: [1, "Store Number must be greater than 0"]
    },
    isOpen: {
      type: Boolean,
      required: [true, "Store must be either open or closed"],
      enum: [true, false]
    }
}, {timestamps: true});

const Stores = mongoose.model('Stores', StoreSchema);

module.exports = Stores;