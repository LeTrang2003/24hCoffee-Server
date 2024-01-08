const database = require('../../database/database')

// tương tác với database , thực hiện câu lệnh truy vấn lấy danh sách danh mục
const getListCategoryModel = async () => {
    const query = "SELECT * FROM DanhMuc WHERE hienThi = 1"
    return await database.queryDatabase(query, [])
}

module.exports = {
    getListCategoryModel
}