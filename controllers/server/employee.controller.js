const employeeModel = require('../../models/server/employee.model.js');
const arrayHelpers = require('../../helpers/array-helpers.js');
const cloudinary = require('../../cloud/cloudinary.js');

const multer = require('multer');

// Set up multer storage and upload
const upload = multer({ storage: multer.memoryStorage() }).single('image');

const renderPageEmployee = async (req, res) => {
  try {
    const user = req.session.user;
    const infoPage = {
      title: 'Quản lý nhân viên',
      avatar: user.anhDaiDien,
      fullname: user.hoVaTen
    }
    const employees = await employeeModel.getEmployees();
    const employeesReversed = arrayHelpers.reverseArray(employees);
    res.render('employee', { employees: employeesReversed, infoPage });
  } catch (error) {
    console.error('Render page employee failed', error);
  }
}

const renderPageInsertEmployee = async (req, res) => {
  try {
    const user = req.session.user;
    const infoPage = {
      title: 'Thêm nhân viên',
      avatar: user.anhDaiDien,
      fullname: user.hoVaTen
    }
    res.render('insertEmployee', { infoPage });
  } catch (error) {
    console.error('Render page insert employee failed', error);
  }
}

const insertEmployee = async (req, res) => {
  const user = req.session.user;
  const infoPage = {
    title: 'Thêm nhân viên',
    avatar: user.anhDaiDien,
    fullname: user.hoVaTen
  }
  try {
    upload(req, res, async (err) => {
      const { username, password, fullname, phoneNumber, dateOfBirth, gender } = req.body;

      // Kiểm tra tên đăng nhập có tồn tại hay không
      const accounts = await employeeModel.getAccountsEmployee();
      const isAcountExist = accounts.some((acc) => acc.tenDangNhap == username);
      if (isAcountExist) {
        const warning = 'Tên đăng nhập đã tồn tại'
        res.render('insertEmployee', {
          warning,
          username,
          fullname,
          phoneNumber,
          dateOfBirth,
          gender,
          infoPage
        });
        return;
      }

      if (!req.file) {
        const warning = 'Vui lòng chọn ảnh nhân viên'
        res.render('insertEmployee', {
          warning,
          username,
          fullname,
          phoneNumber,
          dateOfBirth,
          gender,
          infoPage
        });
        return;
      }

      // Thêm nhân viên mới
      const imageBuffer = req.file.buffer;
      const urlImage = await cloudinary.uploadImageToCloudinary(imageBuffer);
      if (urlImage) {
        const employee = {
          username,
          password,
          fullname,
          phoneNumber,
          dateOfBirth,
          gender,
          urlImage,
        }
        await employeeModel.insertEmployee(employee);
        req.flash('success', 'Thêm thành công');
      } else {
        req.flash('error', 'Thêm thành công');
      }

      res.redirect('back');
    });
  } catch (error) {
    console.error('Insert employee failed', error);
  }
}

const removeEmployee = async (req, res) => {
  const username = req.body.username;
  try {
    const removeEmployeeResult = await employeeModel.removeEmployee(username);
    if (removeEmployeeResult && removeEmployeeResult.changedRows > 0) {
      req.flash('success', 'Xoá nhân viên thành công');
    } else {
      req.flash('error', 'Xảy ra lỗi khi xoá nhân viên');
    }

    res.redirect('back');
  } catch (error) {
    console.error('Remove employee failed', error);
  }
}

module.exports = {
  renderPageEmployee,
  renderPageInsertEmployee,
  insertEmployee,
  removeEmployee
}