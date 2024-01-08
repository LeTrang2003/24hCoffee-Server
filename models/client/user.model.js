const database = require("../../database/database.js")

// lấy thông tin người dùng theo id
const readUser = async (id) => {

    const query = "SELECT * FROM nguoidung WHERE tenDangNhap = ?";

    return await database.queryDatabase(query, [id])

}

// cập nhật thông người dùng
const updateUser = async (userName, name, phone, dateOfBirth, sex, image) => {

    const query = "UPDATE NguoiDung SET hoVaTen = ?, anhDaiDien = ?, dienThoai = ?, ngaySinh = ?, gioiTinh = ? WHERE tenDangNhap = ?";

    const querySelect = "SELECT * FROM NguoiDung WHERE tenDangNhap = ?";

    try {
        // Bắt đầu giao dịch
        await database.queryDatabase("START TRANSACTION");

        const results = await database.queryDatabase(query, [name, image, phone, dateOfBirth, sex, userName])

        if (results.affectedRows > 0) {

            const results1 = await database.queryDatabase(querySelect, [userName])

            if (results1.length > 0) {
                await database.queryDatabase("COMMIT");
                // Trả về kết quả thành công
                return { status: "success", user: results1[0] }
            }

        } else {
            // Rollback giao dịch nếu có lỗi
            await database.queryDatabase("ROLLBACK");
            // Trả về kết quả lỗi và thông điệp lỗi
            return { status: "ERROR" };
        }

    } catch (error) {
        // Rollback giao dịch nếu có lỗi
        await database.queryDatabase("ROLLBACK");
        // Trả về kết quả lỗi và thông điệp lỗi
        return { status: "ERROR", error };
    }

}

//đổi mật khẩu người dùng
const resetPass = async (userName, password) => {
    const queryUpdate = "UPDATE NguoiDung SET matKhau = ? WHERE tenDangNhap = ?";

    const querySelect = "SELECT * FROM NguoiDung WHERE tenDangNhap = ?";

    try {
        // Bắt đầu giao dịch
        await database.queryDatabase("START TRANSACTION");

        const results = await database.queryDatabase(queryUpdate, [password, userName])

        if (results.affectedRows > 0) {

            const results1 = await database.queryDatabase(querySelect, [userName])

            if (results1.length > 0) {
                await database.queryDatabase("COMMIT");
                // Trả về kết quả thành công
                return { status: "success", user: results1[0] }
            }

        } else {
            // Rollback giao dịch nếu có lỗi
            await database.queryDatabase("ROLLBACK");
            // Trả về kết quả lỗi và thông điệp lỗi
            return { status: "ERROR" };
        }

    } catch (error) {
        // Rollback giao dịch nếu có lỗi
        await database.queryDatabase("ROLLBACK");
        // Trả về kết quả lỗi và thông điệp lỗi
        return { status: "ERROR", error };
    }
}

module.exports = {
    readUser,
    updateUser,
    resetPass,
};