import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            required: true,
            maxlength: 60,
        },
        desc: {
            type: String,
            required: true,
            maxlength:300,
        },
        price: {
            type: [Number],
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        extraOptions: {
            type: [
                {
                    text: {type: String },
                    price:{type:Number},
                }
            ]
        }
    },
    { timestamps: true }
)

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)