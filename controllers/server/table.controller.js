const tableModel = require('../../models/server/table.model.js');
const arrayHelpers = require('../../helpers/array-helpers.js');

const renderPageTable = async (req, res) => {
  try {
    const user = req.session.user;
    const infoPage = {
      title: 'Quản lý bàn',
      avatar: user.anhDaiDien,
      fullname: user.hoVaTen
    }
    const tables = await tableModel.getTables();
    const tablesReversed = arrayHelpers.reverseArray(tables);
    res.render('table', { tables: tablesReversed, infoPage});
  } catch (error) {
    console.error('Render page table failed', error);
  }
}

const insertTable = async (req, res) => {
  const tableIndex = req.body.tableIndex;
  try {
    const tables = await tableModel.getTables();

    const isTableIndexExits = tables.some((table) => {
      return table.soThuTu === parseInt(tableIndex, 10);
    });

    if (isTableIndexExits) {
      req.flash('warning', 'Số bàn đã tồn tại');
    } else {
      await tableModel.insertTable(tableIndex);
      req.flash('success', 'Thêm bàn mới thành công');
    }

    res.redirect('back');
  } catch (error) {
    console.error('Insert table failed', error);
  }
}

const removeTable = async (req, res) => {
  const tableID = req.body.tableID;
  try {
    const tables = await tableModel.getTables();
    const tableToRemove = tables.find(table => {
      return table.id === parseInt(tableID, 10)
    });
    const isOrder = tableToRemove.trangThaiOrder === 'Có khách';

    if (isOrder) {
      req.flash('warning', 'Bàn hiện tại đang có khách hàng, không thể xoá');
    } else {
      const removeTableResult = await tableModel.removeTable(tableID);

      if (removeTableResult && removeTableResult.changedRows > 0) {
        req.flash('success', 'Xoá bàn thành công');
      } else {
        req.flash('success', 'Xoá bàn không thành công');
      }
    }

    res.redirect('back');
  } catch (error) {
    console.error('Remove table failed', error);
  }
}

module.exports = {
  renderPageTable,
  insertTable,
  removeTable
}