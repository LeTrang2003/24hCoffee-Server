const database = require('../../database/database')

// tương tác với database , thực hiện câu lệnh thêm hóa đơn mới và cập nhật trạng thái bàn
const insertBillModel = async (id, tableID, userID) => {
    const query = "INSERT INTO HoaDon(id, banID, nguoiDungID) VALUES(?, ?, ?)"
    const queryUpdate = "UPDATE Ban SET trangThaiOrder = 'Có khách' WHERE id = ?"

    try {
        // Bắt đầu giao dịch
        await database.queryDatabase("START TRANSACTION");

        const results = await database.queryDatabase(query, [id, tableID, userID])

        if (results.affectedRows > 0) {

            const results1 = await database.queryDatabase(queryUpdate, [tableID])

            if (results1.affectedRows > 0) {
                await database.queryDatabase("COMMIT");
                // Trả về kết quả thành công
                return { status: "success" }
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

// tương tác với database , thực hiện câu lệnh xóa hóa đơn chi tiết
const deleteBillDetailModel = async (id) => {
    const query = "DELETE FROM HoaDonChiTiet WHERE id = ?"
    return await database.queryDatabase(query, [id])
}

// tương tác với database , thực hiện câu lệnh  caập nhật số lượng đồ uống hóa đơn chi tiết
const updateQuantityBillDetailModel = async (id, quantity) => {
    const query = "UPDATE HoaDonChiTiet SET soLuong = ? WHERE id = ?"
    return await database.queryDatabase(query, [quantity, id])
}

// tương tác với database , thực hiện câu lệnh lấy thông tin hóa đơn và bàn
const readBillByTableIDModel = async (tableID) => {
    const query = "SELECT HoaDon.id, HoaDon.gioVao, Ban.soThuTu, Ban.trangThaiOrder FROM HoaDon " +
        "LEFT JOIN Ban ON HoaDon.banID = Ban.id " +
        "WHERE Ban.id = ? AND HoaDon.trangThaiThanhToan = 'Chưa thanh toán'"
    return await database.queryDatabase(query, [tableID])
}

// tương tác với database , thực hiện câu lệnh lấy thông tin hóa đơn chi tiết
const readBillDetailModel = async (billID) => {
    const query = "SELECT HoaDonChiTiet.id, HoaDonChiTiet.soLuong, HoaDonChiTiet.sanPhamID ,SanPham.anhSanPham, SanPham.tenSanPham, SanPham.giaSanPham FROM HoaDonChiTiet " +
        "INNER JOIN SanPham ON HoaDonChiTiet.sanPhamID = SanPham.id " +
        "WHERE HoaDonChiTiet.hoaDonID = ?"
    return await database.queryDatabase(query, [billID])
}


// tương tác với database , thực hiện câu lệnh thêm hóa đơn chi tiết vào db
const insertBillDetailModel = async (quantity, intoMoney, productID, billID) => {
    const query = "INSERT INTO HoaDonChiTiet(soLuong, thanhTien, sanPhamID, hoaDonID) VALUES(?, ?, ?, ?)"
    return await database.queryDatabase(query, [quantity, intoMoney, productID, billID])
}


// tương tác với database , thực hiện câu lệnh cập nhật lại trạng thái thanh toán hóa đơn và trạng thái bàn
const updateStatusBillModel = async (billId, tableId, timeOut, datePayment, intoMoney) => {
    const queryUpdateBill = "UPDATE HoaDon SET gioRa = ?, ngayThanhToan = ?, thanhTien = ?, trangThaiThanhToan = 'Đã thanh toán' WHERE id = ?"
    const queryUpdateTable = "UPDATE Ban SET trangThaiOrder = 'Trống' WHERE id = ?"

    try {
        // Bắt đầu giao dịch
        await database.queryDatabase("START TRANSACTION");

        const results = await database.queryDatabase(queryUpdateBill, [timeOut, datePayment, intoMoney, billId])

        if (results.affectedRows > 0) {

            const results1 = await database.queryDatabase(queryUpdateTable, [tableId])

            if (results1.affectedRows > 0) {
                await database.queryDatabase("COMMIT");
                // Trả về kết quả thành công
                return { status: "success" }
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


// tương tác với database , thực hiện câu lệnh cập nhật id bàn
const swapTableBillModel = async (id, tableIDBill, tableIDTable) => {
    const query = "UPDATE HoaDon SET banID = ? WHERE id = ?"
    const queryUpdateBill = "UPDATE Ban SET trangThaiOrder = 'Trống' WHERE id = ?"
    const queryUpdateTable = "UPDATE Ban SET trangThaiOrder = 'Có khách' WHERE id = ?"

    try {
        // Bắt đầu giao dịch
        await database.queryDatabase("START TRANSACTION");

        const results = await database.queryDatabase(query, [tableIDTable, id])

        if (results.affectedRows > 0) {

            const results1 = await database.queryDatabase(queryUpdateBill, [tableIDBill])

            if (results1.affectedRows > 0) {

                const results2 = await database.queryDatabase(queryUpdateTable, [tableIDTable])

                if (results2.affectedRows > 0) {
                    await database.queryDatabase("COMMIT");
                    // Trả về kết quả thành công
                    return { status: "success" }
                }
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
    insertBillModel,
    readBillByTableIDModel,
    readBillDetailModel,
    insertBillDetailModel,
    updateStatusBillModel,
    deleteBillDetailModel,
    updateQuantityBillDetailModel,
    swapTableBillModel
}