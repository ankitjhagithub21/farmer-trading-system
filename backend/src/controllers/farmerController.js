import Farmer from "../models/Farmer.js";

export const addFarmer = async (req, res) => {
    try {
        const { name, mobile, productName, weight, rate, total, packet, status} = req.body;
        if(!name || !mobile || !productName || !weight || !rate || !total || !packet || !status){
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const farmer = await Farmer.create(req.body);
        res.json({ data: farmer, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getAllFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find().sort({_id:-1});
        res.json({ data: farmers, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getFarmerByMobile = async (req, res) => {
    try {
        const farmer = await Farmer.find({mobile:req.params.mobile});
        res.json({ data: farmer, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const deleteFarmer = async (req, res) => {
    try {
        await Farmer.findByIdAndDelete(req.params.id);
        res.json({ message: "Farmer deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const updateFarmer = async (req, res) => {
    try {
        let {name,mobile} = req.body;
        await Farmer.findByIdAndUpdate(req.params.id,{name,mobile});
        res.json({ message: "Farmer updated successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
