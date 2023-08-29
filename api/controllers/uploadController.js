const multiparty = require("multiparty");
const { catchAsync } = require("../utils/error");

const upload = catchAsync(async (req, res) => {
  const form = new multiparty.Form({
    autoFiles: false,
    uploadDir: "static/uploads",
    maxFilesSize: 1024 * 1024 * 5,
  });

  form.parse(req, (error, fields, files) => {
    if (!error) {
      const path = files.fileInput[0].path;
      res.status(200).json({
        message: "'upload complete'",
        path: `/static/uploads${path.substr(path.lastIndexOf("/"))}`,
      });
    } else {
      res.json(error);
    }
  });
});

module.exports = {
  upload,
};
