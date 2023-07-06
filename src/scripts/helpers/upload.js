const multer = require('multer')
const path = require("path");
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        var  filePath;
        if(file.mimetype.startsWith('video')){
          filePath = `public/attachments/videos`
        }
        if(file.mimetype.startsWith('image')){
          if(req.path === '/create-product'){
            filePath = `public/attachments/products`
          }else if(req.path === '/create-partner'){
            filePath = `public/attachments/partners`
          }else if(req.path === '/create-whouse'){
            filePath = `public/attachments/whouses`
          }else if(req.path === '/create-recept'){
            filePath = `public/attachments/recepts`
          }
        }


        return cb(null, filePath)
    },
    filename: function(req, file, cb){
      let filename = ''
      if(file.mimetype.startsWith('video')){
        filename = "VIDEO-" + Date.now() + path.extname(file.originalname);
      }
      if(file.mimetype.startsWith('image')){
        filename = "IMAGE-" + Date.now() + path.extname(file.originalname);
      }
      return cb(null, filename);
    }
})

const upload = multer({ storage: storage }).array('attachments');

function Upload(req, res, next){
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log("Error 1 *************", err)
        return res.status(400).send("Not Uploaded");
      } else if (err) {
        console.log("Error 2 *************", err)
        // An unknown error occurred when uploading.
        return res.status(400).send("Unknown error occurred");
      }
      next();
    });
};

const DeleteFile = (destination, fileToDelete) => {
  if(!destination){
    return {message: 'NoDestFound'}
  }else if(!fileToDelete){
    return {message: 'NoFileFound'}
  }

  fs.rm(`public/attachments/${destination}/${fileToDelete}`, {recursive: true}, (err) => {
    if(err){
      console.log(err)
    }
    console.log('Successfully deleted this file.')
  })
}

const FinishUpload = async (req, res, next) => {
    const image_mimetypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/bmp', 'image/png'];
    const video_mimetypes = ['video/mp4', 'video/mov', 'video/wmv', 'video/avi', 'video/avchd', 'video/mkv', 'video/webm', 'video/html5', 'video/mpeg-2']
    let response_files = [];
    req.files.forEach((item) => {
      let filename = item.filename.split('.');
      let destination = ''
      let is_includes = image_mimetypes.includes(item.mimetype) || video_mimetypes.includes(item.mimetype)
      if(is_includes){
        destination = item.path.replace(item.filename, `${filename[0]}-thumbnail.${filename[1]}`);
      }else{
        destination = item.path;
      }
      response_files.push({original:item.path, thumbnail:destination});
    });
    console.log(response_files)
    next()
}

module.exports = {Upload, DeleteFile, FinishUpload}