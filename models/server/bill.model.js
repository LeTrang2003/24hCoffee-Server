const database = require('../../database/database.js');

const getBills = async () => {
  const query = `SELECT hd.*, nd.hoVaTen, b.soThuTu FROM hoadon hd 
                JOIN nguoidung nd 
                ON hd.nguoiDungID = nd.tenDangNhap
                JOIN ban b
                ON b.id = hd.banID;`;
  return await database.queryDatabase(query, []);
}

const getBillByID = async (billID) => {
  const query = `SELECT hd.*, nd.hoVaTen, b.soThuTu FROM hoadon hd 
                JOIN nguoidung nd 
                ON hd.nguoiDungID = nd.tenDangNhap
                JOIN ban b
                ON b.id = hd.banID
                WHERE hd.id =?`;
  return await database.queryDatabase(query, [billID]);
}

const getBillsDetail = async (billID) => {
  const query = `SELECT hdct.*, sp.tenSanPham, sp.anhSanPham FROM hoadonchitiet hdct
                JOIN sanpham sp 
                ON hdct.sanPhamID = sp.id
                WHERE hdct.hoaDonID = ?;
                `;
  return await database.queryDatabase(query, [billID]);
}

const getRevenue = async () => {
  const query = `SELECT
                  months.thang AS thang,
                  YEAR(ngayThanhToan) AS nam,
                  COALESCE(SUM(CASE WHEN hd.trangThaiThanhToan = 'Đã thanh toán' THEN hd.thanhTien ELSE 0 END), 0) AS doanhThu
                FROM
                  (
                    SELECT 1 AS thang UNION ALL
                    SELECT 2 UNION ALL
                    SELECT 3 UNION ALL
                    SELECT 4 UNION ALL
                    SELECT 5 UNION ALL
                    SELECT 6 UNION ALL
                    SELECT 7 UNION ALL
                    SELECT 8 UNION ALL
                    SELECT 9 UNION ALL
                    SELECT 10 UNION ALL
                    SELECT 11 UNION ALL
                    SELECT 12
                  ) AS months
                LEFT JOIN hoadon hd ON MONTH(hd.ngayThanhToan) = months.thang
                GROUP BY
                nam,
                  months.thang
                ORDER BY
                nam,
                  months.thang`;
  return await database.queryDatabase(query, []);
}

module.exports = {
  getBills,
  getBillByID,
  getBillsDetail,
  getRevenue
}