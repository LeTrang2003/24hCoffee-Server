const model = require('../../models/client/table.model')

// lấy danh sách bàn
const getListTableController = async (req, res) => {
    try {
        const results = await model.getListTableModel()

        if (results.length > 0) {
            res.json({ status: "success", tables: results })
        } else {
            res.json({ status: "not found" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

// lấy danh sách bàn trống
const getListTableEmtyController = async (req, res) => {
    try {
        const results = await model.getListTablEmtyModel()

        if (results.length > 0) {
            res.json({ status: "success", tables: results })
        } else {
            res.json({ status: "not found" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}
module.exports = {
    getListTableController,
    getListTableEmtyController
}