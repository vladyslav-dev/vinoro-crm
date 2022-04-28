const ProductModel = require('../models/ProductModel');
const cloudinary = require('../utils/cloudinary')
const ProductDto = require('../dtos/productDtos');
const SearchProductsDto = require('../dtos/SearchProductDtos')
const utils = require('../utils');

class ProductService {
    async create(data) {

        const categoryId = data.category

        const folderName = await utils.getFolderName(categoryId);

        const image = await cloudinary.uploader.upload(data.image, {
            folder: `vinoro/products/${folderName}`,
            transformation: [
                {
                    quality: "auto",
                    fetch_format: "webp",
                    width: 1280,
                    height: 1920
                }
            ]
        })

        // last order id
        const lastElement = await ProductModel.find({category : data.category}).sort({order_id : -1}).limit(1)

        const product = new ProductModel({
            order_id: lastElement.length ? lastElement[0]['order_id'] + 1 : 0,
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

        const folderName = await utils.getFolderName(product.category);

            const image = await cloudinary.uploader.upload(product.image, {
                folder: `vinoro/products/${folderName}`,
                transformation: [
                    {
                        quality: "auto",
                        fetch_format: "webp",
                        width: 1280,
                        height: 1920
                    }
                ]
            })

            product.image = image.secure_url;

            const res = await ProductModel.findByIdAndUpdate(product.id, {
                ...product,
                modified_date: Date.now()
            }, { new: true })

            const productDto = new ProductDto(res);

            return productDto;
    }

    async getOne(id) {

        const product = await ProductModel.findById(id);

        const productDto = new ProductDto(product);

        return productDto
    }

    async getAll() {
        const products = await ProductModel.find().sort([['category'], ['order_id', 0]])

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

    async getSearchProducts() {
        const searchProducts = await ProductModel.find({}, ['_id', 'name', 'category']);

        const searchProductsDto = searchProducts.map(item => new SearchProductsDto(item))

        return searchProductsDto
    }

    async getProductsByCategoryId(id) {

        const products = await ProductModel.find({ category: id }).sort('order_id');

        const productsDto = products.map(product => new ProductDto(product));

        return productsDto
    }

    async getDiscountedProducts() {
        const products = await ProductModel.find({ discount_price: { $ne: null } }).sort('order_id');

        const productsDto = products.map(product => new ProductDto(product));

        return productsDto;
    }

    async getNewProducts() {
        const products = await ProductModel.find({ new: true }).sort('order_id');

        const productsDto = products.map(product => new ProductDto(product))

        return productsDto;
    }

    async updateOrder(products) {

        const updateOne = async (model) => {
            await ProductModel.findByIdAndUpdate(model.id, {
                order_id: model.order_id
            })
        }

        products.map(item => updateOne(item))
    }
 }

module.exports = new ProductService()