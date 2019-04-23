var Minio = require("minio");
const CONFIG = require("../config/config");
const { TE, to, ReE, ReS } = require("../services/util.service");

var minioClient = new Minio.Client({
  endPoint: CONFIG.minio_endPoint,
  port: parseInt(CONFIG.minio_port, 10),
  useSSL: false,
  accessKey: CONFIG.minio_accessKey,
  secretKey: CONFIG.minio_secretKey
});

// const upload = async function(req, res) {
//   const body = req.body;
//   console.log(JSON.stringify(req.body));
//   minioClient.fPutObject("test", body.fileid, body.files, function(e) {
//     if (e) {
//       return console.log(e);
//     }
//     ReS(res, { success: "true" });
//   });
// };
// module.exports.upload = upload;

const getUploadUrl = async function(req, res) {
  let user = req.user;
  console.log(user);
  minioClient.bucketExists(`${user._id}`, function(err, exists) {
    if (err) {
      return console.log(err);
    }
    if (exists) {
      minioClient.presignedPutObject(
        `${user._id}`,
        req.query.name,
        (err, url) => {
          if (err) {
            TE(res, err);
          }
          res.end(url);
        }
      );
    } else {
      minioClient.makeBucket(`${user._id}`, function(err) {
        if (err) return console.log("Error creating bucket.", err);
        console.log('Bucket created successfully in "us-east-1".');
        minioClient.presignedPutObject(
          `${user._id}`,
          req.query.name,
          (err, url) => {
            if (err) {
              TE(res, err);
            }
            res.end(url);
          }
        );
      });
    }
  });
};
module.exports.getUploadUrl = getUploadUrl;

const getFiles = async function(req, res) {
  let user = req.user;
  console.log(user);
  var stream = minioClient.listObjects(`${user._id}`, "", true);
  let array = new Array();
  stream.on("data", obj => {
    array.push(obj);
  });
  stream.on("error", function(err) {
    console.log(err);
  });
  stream.on("end", function() {
    ReS(res, array);
  });
};
module.exports.getFiles = getFiles;

const getDownloadUrl = async function(req, res) {
  let user = req.user;
  console.log(user);
  minioClient.bucketExists(`${user._id}`, function(err, exists) {
    if (err) {
      return console.log(err);
    }
    if (exists) {
      minioClient.presignedGetObject(
        `${user._id}`,
        req.query.name,
        (err, url) => {
          if (err) {
            TE(res, err);
          }
          ReS(res, { url: url });
        }
      );
    }
  });
};

module.exports.getDownloadUrl = getDownloadUrl;
