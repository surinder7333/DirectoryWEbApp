import mongoose from "mongoose";

const productCombinationSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
    },
    grade: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
    }],
    title: {
      type: String,
    },
    price: {
      type: Number,
      default: 350,
    },
    currency: {
      type: String,
      default: "KG",
    },
    shape: {
      type: String,
      default: "",
    },
    length: {
      type: String,
      default: "",
    },
    thickness: {
      type: String,
      default: "",
    },
    surfaceFinish: {
      type: String,
      default: "",
    },
    outsideDiameter: {
      type: String,
      default: "",
    },
    hasDetails: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductCombination", productCombinationSchema);
