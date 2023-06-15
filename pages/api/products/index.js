import dbConnect from "@/util/dbConnect"
import Product from "@/models/Product";

const handler = async (req, res) => {
    await dbConnect();
    const { method } = req
    if (method === "GET") {
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (err) {
            console.log(err)
        }
    }
    if (method === "POST") {
        try {
            const newProducts = await Product.create(req.body)
            res.status(201).json(newProducts)
        } catch (err) {
            console.log(err)
        }
    }
}

export default handler