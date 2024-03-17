const express = require('express');
const router = express.Router();
const { getAllCategory, postCreateCategory, putUpdateCategory, deleteCategory, getOneCategory } = require('../controllers/category-controller');

router.get('/', getAllCategory);
router.post('/:id', getOneCategory);
router.post('/', postCreateCategory);
router.put('/:id', putUpdateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;