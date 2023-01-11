// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let folder = path.join(__dirname, "../../public/images/products");
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage });

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get("/", productsController.index);

/*** CREATE ONE PRODUCT ***/ 
router.get("/create", productsController.create);

router.post("/", upload.single("image"), productsController.store); 



/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 


// /*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.patch('/edit/:id', upload.single("image"),  productsController.update); 


// /*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 



// router.post('/register', uploadFile.single('avatar'), productsController.create)


module.exports = router;
