import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    barcode: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
    },
    weight: {
      type: String,
      required: false,
    },
    color: {
      type: [String],
      required: false,
      default: undefined,
    },

    left: {
      type: Number,
      required: true,
    },
    starRating: {
      type: Number,
      required: false,
    },
    packing: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model("Product", productSchema);
