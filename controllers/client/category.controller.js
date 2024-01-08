const model = require('../../models/client/category.model')

// lấy danh sách danh mục
const getListCategoryController = async (req, res) => {
    try {
        const results = await model.getListCategoryModel()

        if (results.length > 0) {
            res.json({ status: "success", categories: results })
        } else {
            res.json({ status: "not found" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

module.exports = {
    getListCategoryController
}