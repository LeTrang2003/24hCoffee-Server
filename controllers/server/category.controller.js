const categoryModel = require('../../models/server/category.model.js');
const productModel = require('../../models/server/product.model.js');
const arrayHelpers = require('../../helpers/array-helpers.js');

const renderPageCategory = async (req, res) => {
  try {
    const user = req.session.user;
    const infoPage = {
      title: 'Quản lý danh mục',
      avatar: user.anhDaiDien,
      fullname: user.hoVaTen
    }
    const categories = await categoryModel.getCategories();
    const categoriesReversed = arrayHelpers.reverseArray(categories);
    res.render('category', { categories: categoriesReversed, infoPage});
  } catch (error) {
    console.error('Render page category failed', error);
  }
}

const insertCategory = async (req, res) => {
  const categoryName = req.body.categoryName;
  try {
    const categories = await categoryModel.getCategories();

    const isCategoryNameExist = categories.some((category) => {
      return category.tenDanhMuc == categoryName;
    });

    if (isCategoryNameExist) {
      req.flash('warning', 'Tên danh mục đã tồn tại');
    } else {
      await categoryModel.insertCayegory(categoryName.trim());
      req.flash('success', 'Thêm danh mục thành công');
    }

    res.redirect('back');
  } catch (error) {
    console.error('Insert category failed', error);
  }
}

const updateCategory = async (req, res) => {
  const { categoryID, categoryName } = req.body;
  try {
    const categories = await categoryModel.getCategories();
    
    const categoryCurrent = categories.find((category) => {
      return category.id === parseInt(categoryID, 10);
    });

    const categoriesExceptCurrent = categories.filter((category) => {
      return category !== categoryCurrent;
    });

    const isCategoryNameExist = categoriesExceptCurrent.some((category) => {
      return category.tenDanhMuc == categoryName;
    });

    if (isCategoryNameExist) {
      req.flash('warning', 'Tên danh mục đã tồn tại');
    } else {
      const updateCategoryResult = await categoryModel.updateCategory(categoryID, categoryName.trim());
      if (updateCategoryResult && updateCategoryResult.changedRows > 0) {
        req.flash('success', 'Cập nhật danh mục thành công');
      } else {
        req.flash('warning', 'Không có cập nhật nào');
      }
    }

    res.redirect('back');
  } catch (error) {
    console.error('Insert category failed', error);
  }
}

const removeCategory = async (req, res) => {
  const categoryID = req.body.categoryID;
  try {
    const products = await productModel.getProductsByCategoryID(categoryID);
    if (products.length > 0) {
      req.flash('warning', 'Đã có sản phẩm thuộc danh mục này');
      return res.redirect('back');
    }

    const removeCategoryResult = await categoryModel.removeCategory(categoryID);
    if (removeCategoryResult && removeCategoryResult.changedRows > 0) {
      req.flash('success', 'Xoá danh mục thành công');
    } else {
      req.flash('error', 'Xoá danh mục lkhông thành công');
    }
    res.redirect('back');
  } catch (error) {
    console.error('Insert category failed', error);
  }
}

module.exports = {
  renderPageCategory,
  insertCategory,
  updateCategory,
  removeCategory
}