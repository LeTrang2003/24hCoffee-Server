const database = require('../../database/database.js');

const authenticateUser = async (data) => {
  const query = `SELECT * FROM nguoidung WHERE tenDangNhap = ? AND matKhau =? AND hienThi = 1 AND chucVu = 'ADMIN'`;
  const values = [data.username, data.password];
  return await database.queryDatabase(query, values);
}

const updateAccount = async (data) => {
  const query = `UPDATE nguoidung SET matKhau=?, hoVaTen=?, anhDaiDien=?, dienThoai=?, ngaySinh=?, gioiTinh=? WHERE tenDangNhap=?`;
  const values = [
    data.password,
    data.fullname.trim(),
    data.urlImage,
    data.phoneNumber.trim(),
    data.dateOfBirth,
    data.gender,
    data.username.trim(),
  ]
  return await database.queryDatabase(query, values);
}

const getAccountCurrent = async (username) => {
  const query = `SELECT * FROM nguoidung WHERE tenDangNhap = ? AND hienThi = 1`;
  return await database.queryDatabase(query, [username]);
}

module.exports = {
  authenticateUser,
  updateAccount,
  getAccountCurrent
}