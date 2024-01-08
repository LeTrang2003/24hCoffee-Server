const authModel = require('../../models/server/auth.model.js');
const cloudinary = require('../../cloud/cloudinary.js');
const multer = require('multer');

// Set up multer storage and upload
const upload = multer({ storage: multer.memoryStorage() }).single('image');

const renderPageLogin = async (req, res) => {
  res.render('login', { layout: null });
}

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginResults = await authModel.authenticateUser({
      username,
      password
    });

    if (loginResults.length > 0) {
      const user = loginResults[0];
      req.session.user = user;
      req.flash('success', 'Đăng nhập thành công.');
      res.redirect('/');
    } else {
      req.flash('error', 'Đăng nhập không thành công.');
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Login failure', error);
  }
}

const signOut = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Logout falied', error);
    } else {
      res.redirect('/login');
    }
  });
}

const renderPageAccountSetting = async (req, res) => {
  try {
    const user = req.session.user;
    const infoPage = {
      title: 'Cài đặt tài khoản',
      avatar: user.anhDaiDien,
      fullname: user.hoVaTen
    }
    res.render('accountSetting', { user, infoPage});
  } catch (error) {
    console.error('Render page account setting falied', error);
  }
}

const updateAccount = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      const { username, password, fullname, urlImage, phoneNumber, dateOfBirth, gender } = req.body;
      console.log("🚀 ~ file: auth.controller.js:60 ~ upload ~ urlImage:", urlImage)
      let urlImageUpadate = urlImage;

      if (req.file) {
        const imageBuffer = req.file.buffer;
        const urlImageCloud = await cloudinary.uploadImageToCloudinary(imageBuffer);
        urlImageUpadate = urlImageCloud;
      }

      const accountUpdate = {
        username,
        password,
        fullname,
        phoneNumber,
        dateOfBirth,
        gender,
        urlImage: urlImageUpadate
      }

      const updateAccountResult = await authModel.updateAccount(accountUpdate);
      if (updateAccountResult && updateAccountResult.changedRows > 0) {
        req.flash('success', 'Cập nhật thông tin thành công');
        
        // Cập nhật lại phiên bản người dùng hiện tại
        const results = await authModel.getAccountCurrent(username);
        const accountCurrent = results[0];
        if (accountCurrent) {
          req.session.user = accountCurrent;
        }
      } else {
        req.flash('warning', 'Không có cập nhật nào');
      }

      res.redirect('back');
    });
  } catch (error) {
    console.error('Update account failed', error);
  }
}

module.exports = {
  renderPageLogin,
  signIn,
  signOut,
  renderPageAccountSetting,
  updateAccount
}