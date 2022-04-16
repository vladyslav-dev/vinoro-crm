const DashboardService = require('../services/DashboardService');

module.exports.getInfo = async (req, res) => {
    try {
        const info = await DashboardService.getInfo();

        res.json({ info })

    } catch (err) {
        res.send({ message: 'Server error' })
    }
}