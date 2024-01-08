const database = require('../../database/database')

// tương tác với database , thực hiện câu lệnh truy vấn lấy người dùng với đk
const loginModel = async (userName, password) => {
    const query = "SELECT * FROM NguoiDung WHERE tenDangNhap = ? AND matKhau = ? AND chucVu = 'STAFF' AND hienThi = 1"
    return await database.queryDatabase(query, [userName, password])
}

module.exports = {
    loginModel
}