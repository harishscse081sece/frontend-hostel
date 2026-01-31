const Menu = require('../models/Menu');

const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json({ message: "Menu fetched", menu });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateMenu = async (req, res) => {
    try {
        const { day } = req.params;
        const { breakfast, lunch, dinner } = req.body;
        
        const menu = await Menu.findOneAndUpdate(
            { day },
            { breakfast, lunch, dinner },
            { new: true, upsert: true }
        );
        
        res.status(200).json({ message: "Menu updated", menu });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { getMenu, updateMenu };
