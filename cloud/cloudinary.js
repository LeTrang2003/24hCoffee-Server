require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Tải ảnh lên Cloudinary
const uploadImage = (imageBuffer, callback) => {
  cloudinary.uploader.upload_stream({ folder: '24h_coffee/', resource_type: 'image' }, (error, result) => {
    if (error) {
      console.error(error);
      return callback(error, null);
    }
    const imageUrl = result.url;
    callback(null, imageUrl);
  }).end(imageBuffer);
};

//Lấy link ảnh sau khi upload
const uploadImageToCloudinary = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    uploadImage(imageBuffer, (err, imageUrl) => {
      if (err) {
        reject(err);
      } else {
        resolve(imageUrl);
      }
    });
  });
};



const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: '24h_coffee/'
  }
});

const uploadCloud = multer({ storage });

module.exports = {
  uploadImageToCloudinary,
  uploadCloud
};
