const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (fileBuffer, folder = "certificates") => {
  return new Promise((resolve, reject) => {
    console.log(`📤 Starting upload to Cloudinary (folder: ${folder})...`);

    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary Upload Failed:", error);
          reject(error);
        } else {
          console.log("✅ Cloudinary Upload Success:");
          console.log(`   - URL: ${result.secure_url}`);
          console.log(`   - Public ID: ${result.public_id}`);
          console.log(`   - Size: ${result.bytes} bytes`);
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

module.exports = uploadToCloudinary;
