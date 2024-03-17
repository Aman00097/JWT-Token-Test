const Product = require('../model/product-model');

exports.getAllProduct = (req, res) => {
    Product.find()
        .then((product) => res.json(product))
        .catch((err) => res.status(404)
            .json({ message: 'Product Failed', error: err.message })
        );
}

exports.getOneProduct = (req, res) => {
    Product.findById(req.params.id)
        .then((product) => res.json(product))
        .catch((err) => res.status(404)
            .json({ message: 'Product Failed', error: err.message })
        );
}

exports.postCreateProduct = (req, res) => {
    const values = {
        name: req.body.name,
        packSize: req.body.packSize,
        category: req.body.category,
        mrp: req.body.mrp,
        image: req.file.filename,
        status: req.body.status,
    }

    Product.create(values)
        .then((product) =>
            res.json({ message: 'Product Added Successful', product }))
        .catch((err) => res.status(400)
            .json({ message: 'Product Failed', error: err.message })
        );
}

exports.putUpdateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
        .then((product) => res.json({ message: 'Product Updated Successfully', product }))
        .catch((err) => res.status(400)
            .json({ message: 'Failed to update Product', error: err.message })
        );
}

exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then((product) =>
            res.json({ message: "Product deleted successfully", product })
        )
        .catch((err) =>
            res.status(404)
                .json({ message: "Product not found", error: err.message })
        );
};