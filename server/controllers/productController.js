const ProductService = require('../services/ProductService')


module.exports.createProduct = async (req, res) => {
    try {
        const data = req?.body?.data;

        if (data) {
            const productOne = await ProductService.create(data);

            res.json({ product: productOne })
        }
    } catch (error) {
        res.send({message : error})
    }
}

module.exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const product = await ProductService.getOne(id);
            return res.json({ product })
        }

        return res.send({ message: 'Error, product id was not send' })
    } catch (error) {
        res.send({ message : error })
    }req.params
}

module.exports.updateProduct = async (req, res) => {
    try {
        const data = req?.body?.data;

        const product = await ProductService.update(data);

        res.json({ product })

    } catch (error) {
        res.send({message : error})
    }
}

module.exports.getAllProducts = async (req, res) => {
    try {

        const productList = await ProductService.getAll();
        // console.log('productList ', productList)
        res.json({ products: productList })

    } catch (error) {
        res.send({message : error})
    }
};