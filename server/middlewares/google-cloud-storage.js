const gcsHelpers = require('../helpers/gcsHelpers');
  
const { storage } = gcsHelpers;

const DEFAULT_BUCKET_NAME = 'nanowp.deprak.xyz';

/**
 * Middleware for uploading file to GCS.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {*}
 */
exports.sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
  const bucket = storage.bucket(bucketName);
  const gcsFileName = `${Date.now()}-${req.file.originalname}`;
  const file = bucket.file(gcsFileName);
  
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });
  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    console.log(err)
    next(err);
  });
  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsFileName;
    file.makePublic()
    .then(() => {
      req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
      next();
    });
  });
  console.log(req.file, 'ooooooooooooooooooooo')
  
  stream.end(req.file.buffer);
};