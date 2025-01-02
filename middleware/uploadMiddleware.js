export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 5MB",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error.message.includes("Please upload")) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next(error);
};
