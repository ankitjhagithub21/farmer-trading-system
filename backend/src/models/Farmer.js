import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fatherName:{
    type: String,
    required: true,
  },
  address:String,
  mobile: {
    type: String,
    required: true,
  },
  productName:String,
  weight:Number, // 50
  rate:Number, // 15 rupya
  bagQuantity:Number, //2 bora
  status:{
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  material:{
    type: String,
    enum: ['makka', 'gehu', 'dhan', 'haldi'],
    required: true,
  }
},{timestamps: true, versionKey: false});

export default mongoose.model("Farmer", farmerSchema);