const ProductModel = require('../models/ProductModel');
const cloudinary = require('../utils/cloudinary')
const ProductDto = require('../dtos/productDtos');
const utils = require('../utils');

class ProductService {
    async create(data) {
        const lastOrderId = await utils.getLastOrderId(ProductModel);

        const categoryId = data.category

        const image = await cloudinary.uploader.upload(data.image, {
            folder: `vinoro/products/${utils.getFolderName(categoryId)}`,
        })

        // last order id
        const lastOrderId2 = await ProductModel.find({category : data.category}).sort({order_id : -1}).limit(1)

        console.log('lastOrderId2: ')
        console.log(lastOrderId2)

        const product = new ProductModel({
            order_id: lastOrderId ? lastOrderId + 1 : 1,
            name: data.name,
            description: data.description,
            image: image.secure_url,
            price: data.price,
            discount_price: data.discount_price,
            bulk_price: data.bulk_price,
            new: true,
            product_count: 1,
            availability: data.availability,
            visibility: data.visibility,
            category: data.category
        });

        await product.save();

        const productDto = new ProductDto(product);

        return productDto

    }

    async update(product) {
        try {
            console.log('product update')

            const image = await cloudinary.uploader.upload(product.image, {
                folder: `vinoro/products/${utils.getFolderName(product.category)}`,
            })
            product.image = image.secure_url;

            const res = await ProductModel.findByIdAndUpdate(product.id, {
                ...product,
                modified_date: Date.now()
            }, { new: true })
            console.log('result --------------- update')
            console.log(res)

            const productDto = new ProductDto(res);

            return productDto;

        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id) {

        const product = await ProductModel.findById(id);

        const productDto = new ProductDto(product);

        return productDto
    }

    async getAll() {
        const products = await ProductModel.find();

        const productsDto = products.map(product => new ProductDto(product));

        const checkIsNew = async (model) => {
            const isNew = !model.new ? model.new : utils.calcDate(model) ? false : true;

            if (isNew !== model.new) {

                const updatedModel = await ProductModel.findByIdAndUpdate(model.id, {
                    ...model,
                    new: isNew
                })

                return updatedModel
            } else {
                return model
            }
        }

        const checkedProducts = productsDto.map(item => checkIsNew(item))

        return Promise.all(checkedProducts).then(value => {
            return value;
        })
    }
}

module.exports = new ProductService()