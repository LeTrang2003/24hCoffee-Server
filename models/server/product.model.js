const database = require('../../database/database.js');

const getProducts = async () => {
  const query = `SELECT sp.*, dm.tenDanhMuc FROM sanpham sp
                INNER JOIN danhmuc dm ON sp.danhMucID = dm.id
                WHERE sp.hienThi = 1;`;
  return await database.queryDatabase(query, []);
}

const insertProduct = async (data) => {
  const query = `INSERT INTO sanpham (anhSanPham, tenSanPham, giaSanPham, trangThaiSanPham, danhMucID) VALUES (?, ?, ?, ?,?)`;
  const values = [
    data.urlProductImage,
    data.productName.trim(),
    data.productPrice,
    data.productStatus,
    data.categoryID
  ]
  return await database.queryDatabase(query, values);
}

const updateProduct = async (data) => {
  const query = `UPDATE sanpham SET anhSanPham =?, tenSanPham =?, giaSanPham =?, trangThaiSanPham =?, danhMucID=? WHERE id =?`;
  const values = [
    data.urlProductImage,
    data.productName.trim(),
    data.productPrice,
    data.productStatus,
    data.categoryID,
    data.productID
  ]
  return await database.queryDatabase(query, values);
}

const removeProduct = async (productID) => {
  const query = `UPDATE sanpham SET hienThi = '0' WHERE id=?`;
  return await database.queryDatabase(query, [productID]);
}

const getProductById = async (productID) => {
  const query = `SELECT sp.*, dm.tenDanhMuc FROM sanpham sp
  INNER JOIN danhmuc dm ON sp.danhMucID = dm.id
  WHERE sp.hienThi = 1 AND sp.id=?;`;
  const results = await database.queryDatabase(query, [productID]);
  return results[0];
}

const getProductsByCategoryID = async (categoryID) => {
  const query = `SELECT * FROM sanpham WHERE hienThi = 1 AND danhMucID=?;`;
  return await database.queryDatabase(query, [categoryID]);
}

module.exports = {
  getProducts,
  insertProduct,
  updateProduct,
  removeProduct,
  getProductById,
  getProductsByCategoryID
}