const database = require('../../database/database.js');

const getBanners = async () => {
  const query = `SELECT * FROM banner`;
  return await database.queryDatabase(query, []);
}

const insertBanner = async (urlBannerImage) => {
  const query = `INSERT INTO banner (anh) VALUES (?)`;
  return await database.queryDatabase(query, [urlBannerImage]);
}

const updateBannerStatus = async (bannerStatus, bannerID) => {
  const query = `UPDATE banner SET hienThi = ? WHERE id = ?`;
  const values = [bannerStatus, bannerID];
  return await database.queryDatabase(query, values);
}

const removeBanner = async (bannerID) => {
  const query = `DELETE FROM banner WHERE id=?`;
  return await database.queryDatabase(query, [bannerID]);
}

module.exports = {
  getBanners,
  insertBanner,
  updateBannerStatus,
  removeBanner
}