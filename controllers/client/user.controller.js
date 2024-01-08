const model = require('../../models/client/user.model')

const readUser = async (req, res) => {

    try {
        const { id } = req.body;
        const results = await model.readUser(id)
        res.json({ status: "success", user: results[0] });
    } catch (error) {
        res.json({ status: "error", error });
    }

}

const updateUser = async (req, res) => {

    try {
        const image = req.file.path
        const { userName, name, phone, dateOfBirth, sex } = req.body;

        const results = await model.updateUser(userName, name, phone, dateOfBirth, sex, image)

        res.json(results);

    } catch (error) {
        res.json({ status: "error", error });
    }

}


const updateUserNoFile = async (req, res) => {

    try {
        const { userName, name, phone, dateOfBirth, sex, image } = req.body;

        const results = await model.updateUser(userName, name, phone, dateOfBirth, sex, image)

        res.json(results);

    } catch (error) {
        res.json({ status: "error", error });
    }

}

const resetPass = async (req, res) => {

    try {
        const { userName, password } = req.body;

        const results = await model.resetPass(userName, password)

        res.json(results);

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

module.exports = {
    readUser,
    updateUser,
    resetPass,
    updateUserNoFile
}