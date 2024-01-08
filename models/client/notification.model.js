const database = require('../../database/database')

// tương tác với database , thực hiện câu lệnh lấy danh sách thông báo theo id người dùng
const readNotificationModel = async (userID) => {
    const query = "SELECT * FROM ThongBao WHERE nguoiDungID = ?"
    return await database.queryDatabase(query, [userID])
}

// tương tác với database , cập nhật trạng thái thông báo
const updateNotificationModel = async (userID) => {
    const query = "UPDATE ThongBao SET trangThaiXem = 'Đã xem' WHERE nguoiDungID = ?"
    return await database.queryDatabase(query, [userID])
}


// tương tác với database , thêm thông báo
const insertNotificationModel = async (statusSee, content, userId) => {
    const query = "INSERT INTO ThongBao(trangThaiXem, noiDung, nguoiDungID) VALUES(?, ?, ?)"
    return await database.queryDatabase(query, [statusSee, content, userId])
}

// tương tác với database , xóa thông báo
const deleteNotificationModel = async (id) => {
    const query = "DELETE FROM ThongBao WHERE id = ?"
    return await database.queryDatabase(query, [id])
}



module.exports = {
    readNotificationModel,
    updateNotificationModel,
    insertNotificationModel,
    deleteNotificationModel
}