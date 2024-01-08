const database = require('../../database/database')

// tương tác với database , thực hiện câu lệnh truy vấn lấy danh sách bàn
const getListTableModel = async () => {
    const query = "SELECT * FROM Ban WHERE hienThi = 1"
    return await database.queryDatabase(query, [])
}

// tương tác với database , thực hiện câu lệnh truy vấn lấy danh sách bàn trống
const getListTablEmtyModel = async () => {
    const query = "SELECT * FROM Ban WHERE hienThi = 1 AND trangThaiOrder = 'Trống'"
    return await database.queryDatabase(query, [])
}

module.exports = {
    getListTableModel,
    getListTablEmtyModel
}