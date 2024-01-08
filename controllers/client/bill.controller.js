const model = require('../../models/client/bill.model')

// thêm hóa đơn và cập nhật trạng thái bàn
const insertBill = async (req, res) => {
    try {

        const { id, tableID, userID } = req.body

        const results = await model.insertBillModel(id, tableID, userID)

        res.json(results)

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

// lấy thông tin hóa đơn và bàn
const readBillByTable = async (req, res) => {
    try {

        const { tableID } = req.params

        if (!tableID) {
            return res.status(400).json({ status: "error", message: "parameter is missing or empty." });
        }


        const results = await model.readBillByTableIDModel(tableID)

        if (results.length > 0) {
            res.json({ status: "success", tableBill: results[0] })
        } else {
            res.json({ status: "error length" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

// lấy thông tin hóa đơn chi tiết
const readBillDetail = async (req, res) => {
    try {

        const { billID } = req.params

        if (!billID) {
            return res.status(400).json({ status: "error", message: "parameter is missing or empty." });
        }


        const results = await model.readBillDetailModel(billID)

        if (results.length > 0) {
            res.json({ status: "success", billDetails: results })
        } else {
            res.json({ status: "error" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}



// thêm hóa đơn chi tiết
const insertBillDetail = async (req, res) => {
    try {

        const { quantity, intoMoney, productID, billID } = req.body

        const results = await model.insertBillDetailModel(quantity, intoMoney, productID, billID)

        if (results.affectedRows > 0) {
            res.json({ status: "success" })
        } else {
            res.json({ status: "error" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

// cập nhật hóa đơn và trạng thái bàn
const updateBill = async (req, res) => {
    try {

        const { billId, tableId, timeOut, datePayment, intoMoney } = req.body

        const results = await model.updateStatusBillModel(billId, tableId, timeOut, datePayment, intoMoney)

        res.json(results)

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}


// cập nhật số lượng đồ uống
const updateQuantityBillDetail = async (req, res) => {
    try {

        const { id, quantity } = req.body

        const results = await model.updateQuantityBillDetailModel(id, quantity)

        if (results.affectedRows > 0) {
            res.json({ status: "success" })
        } else {
            res.json({ status: "error" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}


// xóa hóa đơn chi tiết
const deleteBillDetail = async (req, res) => {
    try {

        const { id } = req.body

        const results = await model.deleteBillDetailModel(id)

        if (results.affectedRows > 0) {
            res.json({ status: "success" })
        } else {
            res.json({ status: "error" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

// cập nhật ib bàn
const swapTableBill = async (req, res) => {
    try {

        const { id, tableIDBill, tableIDTable } = req.body

        const results = await model.swapTableBillModel(id, tableIDBill, tableIDTable)

        res.json(results)

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}
module.exports = {
    insertBill,
    readBillByTable,
    readBillDetail,
    insertBillDetail,
    updateBill,
    updateQuantityBillDetail,
    deleteBillDetail,
    swapTableBill
}