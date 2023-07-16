import mongoose from "mongoose";

const Reservation = new mongoose.Schema(
    {
        fullName: {
            type: String,
            require: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            maxlength: 300,
        },
        persons: {
            type: String,
            required: true,
        },
        date:{
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default mongoose.models.Reservation || mongoose.model("Reservation", Reservation)