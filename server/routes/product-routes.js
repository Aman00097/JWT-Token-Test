const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getAllProduct, getOneProduct, postCreateProduct, putUpdateProduct, deleteProduct } = require('../controllers/product-controller');


// create storage for employee data and images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + " " + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })


// routes
router.get('/', getAllProduct);
router.get('/:id', getOneProduct);
router.post('/', upload.single('image'), postCreateProduct);
router.put('/:id', putUpdateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;