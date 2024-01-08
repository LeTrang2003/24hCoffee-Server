const database = require('../../database/database.js');

const getCategories = async () => {
  const query = `SELECT dm.*, count(sp.id) as 'soLuongSanPham' FROM danhmuc dm
                LEFT JOIN sanpham sp 
                ON sp.danhMucID = dm.id AND sp.hienThi = 1
                WHERE dm.hienThi = 1
                GROUP BY dm.id;`;
  return await database.queryDatabase(query, []);
}

const insertCayegory = async (categoryName) => {
  const query = `INSERT INTO danhmuc (tenDanhMuc) VALUES (?)`;
  return await database.queryDatabase(query, [categoryName]);
}

const updateCategory = async (categoryID, categoryName) => {
  const query = `UPDATE danhmuc SET tenDanhMuc = ? WHERE id=?`;
  const values = [categoryName, categoryID];
  return await database.queryDatabase(query, values);
}

const removeCategory = async (categoryID) => {
  const query = `UPDATE danhmuc SET hienThi = '0' WHERE id=?`;
  return await database.queryDatabase(query, [categoryID]);
}

module.exports = {
  getCategories,
  insertCayegory,
  updateCategory,
  removeCategory
}