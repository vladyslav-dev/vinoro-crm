const CategoryService = require('../services/CategoryService');

module.exports.createCategory = async (req, res, next) => {
    try {
        const data = req?.body?.data;

        if (data) {
            const categoryOne = await CategoryService.create(data);

            return res.json({ category: categoryOne })
        }
    } catch (error) {
        next(error)
    }
}

module.exports.updateCategory = async (req, res, next) => {
    try {
        const data = req?.body?.data;
        if (data) {
            const category = await CategoryService.update(data);

            return res.json({ category })
        }
    } catch (error) {
        next(error)
    }
}

module.exports.getAllCategory = async (req, res, next) => {
    try {
        const categoryList = await CategoryService.getAll();
        return res.json({ category: categoryList })

    } catch (error) {
        next(error)
    }
};

module.exports.getOneCategory = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (id) {
            const category = await CategoryService.getOne(id);
            return res.json({ category })
        }

        return res.send({ message: 'Error, category id was not send' })

    } catch (error) {
        next(error)
    }
};