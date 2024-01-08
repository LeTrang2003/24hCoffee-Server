const bannerModel = require('../../models/server/banner.model.js');
const arrayHelpers = require('../../helpers/array-helpers.js');
const cloudinary = require('../../cloud/cloudinary.js');

const multer = require('multer');

// Set up multer storage and upload
const upload = multer({ storage: multer.memoryStorage() }).single('image');

const renderPageBanner = async (req, res) => {
  try {
    const user = req.session.user;
    const infoPage = {
      title: 'Quản lý banner',
      avatar: user.anhDaiDien,
      fullname: user.hoVaTen
    }

    const banners = await bannerModel.getBanners();
    const bannersReversed = arrayHelpers.reverseArray(banners);
    res.render('banner', { banners: bannersReversed, infoPage});
  } catch (error) {
    console.error('Render page banner failed', error);
  }
}

const insertBanner = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (!req.file) {
        req.flash('warning', 'Vui lòng chọn ảnh trước khi thêm banner');
        res.redirect('back');
      } else {
        const imageBuffer = req.file.buffer;
        const urlBannerImage = await cloudinary.uploadImageToCloudinary(imageBuffer);

        if (urlBannerImage) {
          await bannerModel.insertBanner(urlBannerImage);
          req.flash('success', 'Thêm banner mới thành công');
        } else {
          req.flash('error', 'Xảy ra lỗi');
        }

        res.redirect('back');
      }
    });
  } catch (err) {
    console.error('Insert banner status failed', err);
  }
}

const updateBannerStatus = async (req, res) => {
  const bannerID = req.params.bannerID;
  const bannerStatus = req.body.bannerStatus;
  try {
    const STATUS_ACTIVE = 1; // Trạng thái hiển thị
    const STATUS_INACTIVE = 0; // Trạng thái ẩn hiển thị

    const newBannerStatus = parseInt(bannerStatus, 10) === STATUS_ACTIVE ? STATUS_INACTIVE : STATUS_ACTIVE;
    const updateBannerResult = await bannerModel.updateBannerStatus(newBannerStatus, bannerID);

    if (updateBannerResult && updateBannerResult.changedRows > 0) {
      req.flash('success', 'Cập nhật hiển thị banner thành công');
    } else {
      req.flash('error', 'Cập nhật hiển thị banner không thành công');
    }

    res.redirect('back');
  } catch (error) {
    console.error('Update banner status failed', error);
  }
}

const removeBanner = async (req, res) => {
  const bannerID = req.body.bannerID;
  try {
    const removeBannerResult = await bannerModel.removeBanner(bannerID);

    if (removeBannerResult && removeBannerResult.affectedRows > 0) { 
      req.flash('success', 'Xoá banner thành công');
    } else {
      req.flash('error', 'Xoá banner không thành công');
    }

    res.redirect('back');
  } catch (error) {
    console.error('Update banner status failed', error);
  }
}

module.exports = {
  renderPageBanner,
  insertBanner,
  updateBannerStatus,
  removeBanner
}