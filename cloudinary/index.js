const crypto = require('crypto'),
cloudinaryStorage = require('multer-storage-cloudinary'),
cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'surf-shop',
    allowedFormats: ['jpeg', 'jpg', 'png'],
    filename: function (req, file, cb) {
        let buf = crypto.randomBytes(16);
        buf = buf.toString('hex');
        let uniqFileName = file.originalname.replace(/\.jpeg|\.webp|\.jpg|\.png/ig, '');
        uniqFileName += buf;
      cb(undefined, uniqFileName );
    }
});

module.exports = {
	cloudinary,
	storage
}
