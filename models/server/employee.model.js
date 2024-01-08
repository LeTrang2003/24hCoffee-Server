const database = require('../../database/database.js');

const getAccountsEmployee = async () => {
  const query = `SELECT * FROM nguoidung`;
  return await database.queryDatabase(query, []);
}

const getEmployees = async () => {
  const query = `SELECT * FROM nguoidung WHERE hienThi = 1 AND chucVu = 'STAFF';`;
  return await database.queryDatabase(query, []);
}

const insertEmployee = async (data) => {
  const query = `INSERT INTO nguoidung (tenDangNhap, matKhau, hoVaTen, anhDaiDien, dienThoai, ngaySinh, gioiTinh) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.username.trim(),
    data.password,
    data.fullname.trim(),
    data.urlImage,
    data.phoneNumber.trim(),
    data.dateOfBirth,
    data.gender
  ]
  return await database.queryDatabase(query, values);
}

const removeEmployee = async (username) => {
  const query = `UPDATE nguoidung SET hienThi = '0' WHERE tenDangNhap=?`;
  return await database.queryDatabase(query, [username]);
}

module.exports = {
  getAccountsEmployee,
  getEmployees,
  insertEmployee,
  removeEmployee
}