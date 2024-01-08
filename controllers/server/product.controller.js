const categoryModel = require('../../models/server/category.model.js');
const productModel = require('../../models/server/product.model.js');
const arrayHelpers = require('../../helpers/array-helpers.js');
const cloudinary = require('../../cloud/cloudinary.js');

const multer = require('multer');

// Set up multer storage and upload
const upload = multer({ storage: multer.memoryStorage() }).single('image');

const renderPageProduct = async (req, res) => {
  try {
    const user = req.session.user;
    const infoPage = {
      title: 'Quản lý sản phẩm',
      avatar: user.anhDaiDien,
      fullname: user.hoVaTen
    }
    const products = await productModel.getProducts();
    const productsReversed = arrayHelpers.reverseArray(products);
    res.render('product', { products: productsReversed, infoPage });
  } catch (error) {
    console.error('Render page product failed', error);
  }
}

const renderPageInsertProduct = async (req, res) => {
  try {
    const user = req.session.user;
    const infoPage = {
      title: 'Thêm sản phẩm',
      avatar: user.anhDaiDien,
      fullname: user.hoVaTen
    }
    const categories = await categoryModel.getCategories();
    res.render('insertProduct', { categories, infoPage });
  } catch (error) {
    console.error('Render page insert product failed', error);
  }
}

const insertProduct = async (req, res) => {
  const user = req.session.user;
  const infoPage = {
    title: 'Thêm sản phẩm',
    avatar: user.anhDaiDien,
    fullname: user.hoVaTen
  }
  try {
    upload(req, res, async (err) => {
      const { productName, productPrice, productStatus, categoryID } = req.body;

      const products = await productModel.getProducts();
      const isProductNameExist = products.some((product) => {
        return product.tenSanPham == productName.trim();
      });

      if (isProductNameExist) {
        const categories = await categoryModel.getCategories();
        const warning = 'Tên sản phẩm đã tồn tại';
        res.render('insertProduct', { categories, productName, productPrice, warning, infoPage });
        return;
      }

      if (!req.file) {
        const categories = await categoryModel.getCategories();
        const warning = 'Vui lòng chọn ảnh sản phẩm trước khi thêm';
        res.render('insertProduct', { categories, productName, productPrice, warning, infoPage });
      } else {
        const imageBuffer = req.file.buffer;
        const urlProductImage = await cloudinary.uploadImageToCloudinary(imageBuffer);

        if (urlProductImage) {
          const product = {
            urlProductImage,
            productName,
            productPrice,
            productStatus,
            categoryID
          }
          await productModel.insertProduct(product);
          req.flash('success', 'Thêm sản phẩm mới thành công');
        } else {
          req.flash('error', 'Xảy ra lỗi khi thêm sản phẩm');
        }

        res.redirect('back');
      }
    });
  } catch (error) {
    console.error('Insert product failed', error);
  }
}

const renderPageUpdateProduct = async (req, res) => {
  const productID = req.params.productID;
  try {
    const user = req.session.user;
    const infoPage = {
      title: 'Cập nhật sản phẩm',
      avatar: user.anhDaiDien,
      fullname: user.hoVaTen
    }
    const product = await productModel.getProductById(productID);
    if (product) {
      const categories = await categoryModel.getCategories();
      res.render('updateProduct', { categories, product, infoPage });
    } else {
      req.flash('error', 'Hệ thống xảy ra lỗi');
      res.redirect('back');
    }
  } catch (error) {
    console.error('Render page insert product failed', error);
  }
}

const updateProduct = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      const productID = req.params.productID;
      const { productName, urlProductImage, productPrice, productStatus, categoryID } = req.body;
      let urlProductImageUpdate = urlProductImage;

      if (req.file) {
        const imageBuffer = req.file.buffer;
        const urlProductImage = await cloudinary.uploadImageToCloudinary(imageBuffer);
        urlProductImageUpdate = urlProductImage;
      }

      const product = {
        urlProductImage: urlProductImageUpdate,
        productName,
        productPrice,
        productStatus,
        categoryID,
        productID
      }

      const updateProductResult = await productModel.updateProduct(product);
      if (updateProductResult && updateProductResult.changedRows > 0) {
        req.flash('success', 'Cập nhật sản phẩm thành công');
      } else {
        req.flash('warning', 'Không có cập nhật nào');
      }

      res.redirect('back');
    });
  } catch (error) {
    console.error('Update product failed', error);
  }
}

const removeProduct = async (req, res) => {
  const productID = req.body.productID;
  try {
    const removeProductResult = await productModel.removeProduct(productID);
    if (removeProductResult && removeProductResult.changedRows > 0) {
      req.flash('success', 'Xoá sản phẩm thành công');
    } else {
      req.flash('error', 'Xảy ra lỗi khi xoá sản phẩm');
    }

    res.redirect('back');
  } catch (error) {
    console.error('Remove product failed', error);
  }
}

module.exports = {
  renderPageProduct,
  renderPageInsertProduct,
  insertProduct,
  renderPageUpdateProduct,
  updateProduct,
  removeProduct
}