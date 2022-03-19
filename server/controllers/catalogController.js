const CatalogModel = require('../models/CatalogModel')


module.exports.createCatalog = async (req, res) => {
    console.log(req.body);

    const catalogData = {
        catalog_name: req.body.name,
        catalog_image: req.body.image,
        visibility: req.body.visibility,
    }

    const catalog = await new CatalogModel(catalogData)

    await catalog.save();
    console.log(catalog);

    res.json({ catalog })
}

module.exports.updateCatalog = async (req, res) => {

}

module.exports.getCatalog = async (req, res) => {
    try {

        const catalog = await CatalogModel.find()

        console.log(catalog)

        res.json({ catalog })


    } catch (err) {

        res.send({message : 'Server error'})
    }
};