require('dotenv').config()
const Product = require('./Schema')
const { connect } = require('mongoose')


const CreateProduct = async (req, res) => {

    const { name, description, price, category, brand, thumbnail, rating, images } = req.body

    if (!name || !description || !price || !category || !brand || !thumbnail || !images) {
        res.status(403).json(
            {
                message: "Missing Required Field"
            }
        )
    }
    else {

        try {
            await connect(process.env.MONGO_URI)
            console.log("DB CONNECTED")

            const ProductExist = await Product.exists({ name })

            if (ProductExist) {
                res.status(400).json({
                    Message: "Brand Already Exists"
                })
            }

            else {
                await Product.create({ name, description, price, category, brand, thumbnail, rating, images })
                const product = await Product.find()

                res.status(201).json({
                    message: "Product Added Successfully",
                    Product: product
                })

            }

        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Database Connection Failed"
            })
        }

    }

}

const getAllProduct = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        const product = await Product.find()

        res.status(200).json({
            Product: product
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        })
    }
}

const getProductByBrand = async (req, res) => {
    const { brand } = req.query
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        const product = await Product.find({ brand })

        res.status(200).json({
            Product: product
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        })
    }
}

const getProductById = async (req, res) => {
    const { _id } = req.query
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        const product = await Product.findOne({ _id })

        res.status(200).json({
            message:"Product by ID",
            Product: product
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        })
    }
}

const getProductByCategory = async (req, res) => {
    const { category } = req.query
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        const product = await Product.find({ category })

        res.status(200).json({
            Product: product
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        })
    }
}

const UpdateProduct = async (req, res) => {
    const { _id, name, description, price, category, brand, thumbnail, rating, images } = req.body

    if (!_id ) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        const filter = { _id }
        const update = { name, description, price, category, brand, thumbnail, rating, images }

        try {
            await connect(process.env.MONGO_URI)
            console.log("DB CONNECTED")

            await Product.findOneAndUpdate(filter, update, {
                new: true
            })

            const product = await Product.find()

            res.status(200).json({
                Message: "Update Sucessfully",
                Product: product
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Database Connection Failed"
            })
        }
    }
}

const DeleteProduct = async (req, res) => {
    const { _id } = req.body
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        await Product.findOneAndDelete({ _id })
        const product = await Product.find()

        res.status(200).json({
            message: "Delete Sucessfully",
            Product: product
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        })
    }
}

module.exports = { CreateProduct, getAllProduct, getProductByBrand, getProductById, getProductByCategory, UpdateProduct, DeleteProduct }