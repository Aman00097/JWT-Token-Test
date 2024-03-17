const Category = require('../model/category-model');

exports.getAllCategory = (req, res) => {
    Category.find()
        .then((category) => res.json(category))
        .catch((err) => res.status(404)
            .json({ message: 'Category Data Failed', error: err.message })
        );
}

exports.getOneCategory = (req, res) => {
    Category.findById(req.body.categoryId)
        .then((category) => res.json(category))
        .catch((err) => res.status(404)
            .json({ message: 'Category Data Failed', error: err.message })
        );
}

exports.postCreateCategory = (req, res) => {
    Category.create(req.body)
        .then((category) =>
            res.json({ message: 'Category Added Successful', category }))
        .catch((err) => res.status(400)
            .json({ message: 'Login Failed', error: err.message })
        );
}

exports.putUpdateCategory = (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body)
        .then((category) => res.json({ message: 'Category Updated Successfully', category }))
        .catch((err) => res.status(400)
            .json({ message: 'Failed to update category', error: err.message })
        );
}

exports.deleteCategory = (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then((category) =>
            res.json({ message: "Category deleted successfully", category })
        )
        .catch((err) =>
            res.status(404)
                .json({ message: "Category not found", error: err.message })
        );
};