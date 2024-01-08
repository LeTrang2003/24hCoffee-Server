const database = require('../../database/database')

// tương tác với database , thực hiện câu lệnh truy vấn lấy danh sách banner
const getListBannerModel = async () => {
    const query = "SELECT * FROM Banner WHERE hienThi = 1"
    return await database.queryDatabase(query, [])
}

module.exports = {
    getListBannerModel
}