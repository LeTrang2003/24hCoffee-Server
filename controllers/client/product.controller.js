const model = require('../../models/client/product.model')

// lấy danh sách sản phẩm
const getListProductController = async (req, res) => {
    try {
        const results = await model.getListProductModel()

        if (results.length > 0) {
            res.json({ status: "success", products: results })
        } else {
            res.json({ status: "not found" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

// lấy danh sách sản phẩm còn hhangf
const getListProductHaveController = async (req, res) => {
    try {

        const results = await model.getListProductHaveModel()

        if (results.length > 0) {
            res.json({ status: "success", products: results })
        } else {
            res.json({ status: "not found" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

module.exports = {
    getListProductController,
    getListProductHaveController
}