const model = require('../../models/client/banner.model')

// lấy danh sách bannner
const getListBannerController = async (req, res) => {
    try {
        const results = await model.getListBannerModel()

        if (results.length > 0) {
            res.json({ status: "success", banners: results })
        } else {
            res.json({ status: "not found" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

module.exports = {
    getListBannerController
}