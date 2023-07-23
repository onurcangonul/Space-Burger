import dbConnect from "@/util/dbConnect"
import Reservation from "@/models/Reservation";

const handler = async (req, res) => {
    await dbConnect();
    const { method, query: { id }, } = req

    if (method === "GET") {
        try {
            const reservation = await Reservation.findById(id)
            res.status(200).json(reservation)
        } catch (err) {
            console.log(err)
        }
    }
    if (method === "DELETE") {
        try {
            const reservations = await Reservation.findByIdAndDelete(id)
            res.status(200).json(reservations)
        } catch (err) {
            console.log(err)
        }
    }

};

export default handler