const tableModel = require('../../models/server/table.model.js');
const productModel = require('../../models/server/product.model.js');
const employeeModel = require('../../models/server/employee.model.js');
const billModel = require('../../models/server/bill.model.js');

const renderPageHome = async (req, res) => {
  try {
    const user = req.session.user;
    const infoPage = {
      title: 'Trang chủ',
      avatar: user.anhDaiDien,
      fullname: user.hoVaTen
    }
    const tables = await tableModel.getTables();
    const products = await productModel.getProducts();
    const employees = await employeeModel.getEmployees();
    const bills = await billModel.getBills();
    const revenue = await billModel.getRevenue();
    const data = {
      countTable: tables.length,
      countProduct: products.length,
      countEmployee: employees.length,
      countBill: bills.length,
      revenue: JSON.stringify(revenue),
      currentYear: parseInt(new Date().getFullYear())
    }

    res.render('home', { infoPage, data });
  } catch (error) {
    console.error('Render page banner failed', error);
  }
}

module.exports = {
  renderPageHome,
}