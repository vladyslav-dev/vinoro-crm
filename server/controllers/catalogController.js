const CatalogService = require('../services/CatalogService');

module.exports.createCatalog = async (req, res) => {
    try {
        const data = req?.body?.data;

        if (data) {
            const catalogOne = await CatalogService.create(data);
            res.json({ catalogOne })
        }
    } catch (error) {
        res.send({message : 'Server error'})
    }
}

module.exports.updateCatalog = async (req, res) => {

}

module.exports.getAllCatalog = async (req, res) => {
    try {
        const catalog = await CatalogService.getAll();
        res.json({ catalog })

    } catch (err) {
        res.send({message : 'Server error'})
    }
};