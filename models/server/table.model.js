const database = require('../../database/database.js');

const getTables = async () => {
  const query = `SELECT * FROM ban WHERE hienThi = 1;`;
  return await database.queryDatabase(query, []);
}

const insertTable = async (tabelIndex) => {
  const query = `INSERT INTO ban (soThuTu) VALUES (?)`;
  return await database.queryDatabase(query, [tabelIndex]);
}

const updateTable = async (tableID, tableIndex) => {
  const query = `UPDATE ban SET soThuTu = ? WHERE id=?`;
  const values = [tableIndex, tableID];
  return await database.queryDatabase(query, values);
}

const removeTable = async (tableID) => {
  const query = `UPDATE ban SET hienThi = '0' WHERE id=?`;
  return await database.queryDatabase(query, [tableID]);
}

module.exports = {
  getTables,
  insertTable,
  updateTable,
  removeTable
}