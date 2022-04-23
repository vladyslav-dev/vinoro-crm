const ProductService = require('../services/ProductService')


module.exports.createProduct = async (req, res, next) => {
    try {
        const data = req?.body?.data;

        if (data) {
            const productOne = await ProductService.create(data);

            return res.json({ product: productOne })
        }

        return res.send({ message: 'Error, data was not send' })
    } catch (error) {
        next(error)
    }
}

module.exports.getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (id) {
            const product = await ProductService.getOne(id);
            return res.json({ product })
        }

        return res.send({ message: 'Error, product id was not send' })
    } catch (error) {
        next(error)
    }
}

module.exports.updateProduct = async (req, res, next) => {
    try {
        const data = req?.body?.data;

        if (data) {
            const product = await ProductService.update(data);

            return res.json({ product })
        }

        return res.send({ message: 'Error, data was not send' })

    } catch (error) {
        next(error)
    }
}

module.exports.getAllProducts = async (req, res, next) => {
    try {
        const productList = await ProductService.getAll();

        return res.json({ products: productList })

    } catch (error) {
        next(error)
    }
};

module.exports.getProductsByCategoryId = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (id) {
            const products = await ProductService.getProductsByCategoryId(id);
            return res.json({ products })
        }

        return res.send({ message: 'Error, category id was not send' })

    } catch (error) {
        next(error)
    }
}

module.exports.getDiscountedProducts = async (req, res, next) => {
    try {
        const productList = await ProductService.getDiscountedProducts();

        return res.json({ products: productList })

    } catch (error) {
        next(error)
    }
}

module.exports.getNewProducts = async (req, res, next) => {
    try {
        const productList = await ProductService.getNewProducts();

        return res.json({ products: productList })

    } catch (error) {
        next(error)
    }
}

module.exports.updateProductOrder = async (req, res, next) => {
    try {

        const data = req.body.data

        if (data) {
            await ProductService.updateOrder(data);

            return res.send('Success')
        }

    } catch (error) {
        next(error)
    }
}