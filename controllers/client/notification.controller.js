const model = require('../../models/client/notification.model')

// lấy danh sách thông báo theo id người dùng
const readNotification = async (req, res) => {
    try {

        const { userID } = req.body
        if (!userID) {
            return res.status(400).json({ status: "error", message: "parameter is missing or empty." });
        }
        const results = await model.readNotificationModel(userID)

        if (results.length > 0) {
            res.json({ status: "success", notifications: results })
        } else {
            res.json({ status: "not found" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

// lấy danh sách thông báo theo id người dùng
const updateNotification = async (req, res) => {
    try {

        const { userID } = req.body
        if (!userID) {
            return res.status(400).json({ status: "error", message: "parameter is missing or empty." });
        }
        const results = await model.updateNotificationModel(userID)

        if (results.affectedRows > 0) {
            res.json({ status: "success" })
        } else {
            res.json({ status: "not found" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

// thêm thông báo
const insertNotification = async (req, res) => {
    try {

        const { content, userId } = req.body
        const statusSee = 'Chưa xem'
        if (!userId || !statusSee || !content) {
            return res.status(400).json({ status: "error", message: "parameter is missing or empty." });
        }
        const results = await model.insertNotificationModel(statusSee, content, userId)

        if (results.affectedRows > 0) {
            res.json({ status: "success" })
        } else {
            res.json({ status: "error" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

// xóa thông báo
const deletetNotification = async (req, res) => {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ status: "error", message: "parameter is missing or empty." });
        }
        const results = await model.deleteNotificationModel(id)

        if (results.affectedRows > 0) {
            res.json({ status: "success" })
        } else {
            res.json({ status: "error" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

module.exports = {
    readNotification,
    updateNotification,
    insertNotification,
    deletetNotification
}