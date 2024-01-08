const model = require('../../models/client/account.model')

// kiểm tra thông tin tài khoản để đăng nhập
const loginController = async (req, res) => {
    try {
        const { userName, password } = req.body
        if (!userName || !password) {
            return res.status(400).json({ status: "error", message: "parameter is missing or empty." });
        }

        const results = await model.loginModel(userName, password)

        if (results.length > 0) {
            res.json({ status: "success", user: results[0] })
        } else {
            res.json({ status: "not found" })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

module.exports = {
    loginController
}