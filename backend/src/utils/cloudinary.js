import { v2 as cloudinary } from "cloudinary"
import env from "../config/env.js";
import fs from "fs"

cloudinary.config({
    cloud_name: env.CLOUD_NAME,
    api_key: env.API_KEY,
    api_secret: env.API_SECRET,
});

export const handleUpload = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const res = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        });

        console.log("Response from cloudinary", res)
        return res;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}
