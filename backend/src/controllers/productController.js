import Farmer from "../models/Product.js";

export const addProduct = async (req, res) => {
    try {
        const { farmer, productName, weight, rate, bagQuantity, status, material } = req.body;

        if(!farmer || !productName || !weight || !rate || !bagQuantity || !status || !material) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        
        const product = await Farmer.create(req.body);
        res.json({ data: product, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Farmer.find().sort({_id:-1});
        res.status(200).json({ data: products, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


export const getDashboardStats = async (req, res) => {
    try {
        const farmers = await Farmer.find();
        
        // Calculate total deals
        const totalDeals = farmers.length;
        
        // Calculate total earnings (weight * rate * bagQuantity for paid deals)
        const totalEarnings = farmers
            .filter(farmer => farmer.status === 'paid' && farmer.weight && farmer.rate && farmer.bagQuantity)
            .reduce((total, farmer) => total + (farmer.weight * farmer.rate * farmer.bagQuantity), 0);
        
        // Calculate total bag quantity
        const totalBagQuantity = farmers
            .filter(farmer => farmer.bagQuantity)
            .reduce((total, farmer) => total + farmer.bagQuantity, 0);
        
        // Calculate total weight
        const totalWeight = farmers
            .filter(farmer => farmer.weight)
            .reduce((total, farmer) => total + farmer.weight, 0);
        
        // Count by status
        const paidDeals = farmers.filter(farmer => farmer.status === 'paid').length;
        const pendingDeals = farmers.filter(farmer => farmer.status === 'pending').length;
        
        // Count by material
        const materialStats = farmers.reduce((acc, farmer) => {
            if (farmer.material) {
                acc[farmer.material] = (acc[farmer.material] || 0) + 1;
            }
            return acc;
        }, {});
        
        // Recent deals (last 5)
        const recentDeals = farmers
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 5)
            .map(farmer => ({
                id: farmer._id,
                name: farmer.name,
                material: farmer.material,
                weight: farmer.weight,
                rate: farmer.rate,
                status: farmer.status,
                createdAt: farmer.createdAt
            }));
        
        const dashboardData = {
            totalDeals,
            totalEarnings,
            totalBagQuantity,
            totalWeight,
            paidDeals,
            pendingDeals,
            materialStats,
            recentDeals
        };
        
        res.status(200).json({ data: dashboardData, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Farmer.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Farmer.findByIdAndUpdate(req.params.id,req.body, { returnDocument: 'after' });
        res.json({ message: "Product updated successfully", data: product, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
