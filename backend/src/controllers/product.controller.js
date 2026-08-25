import { productModel } from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
    try {
        const { title, description, price } = req.body;
        const seller = req.user;
        
        if (!seller) {
            return res.status(401).json({ message: "Unauthorised seller" });
        }

        const fileList = req.files || [];
        const images = await Promise.all(fileList.map(async (file) => {
            const uploadRes = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            });
            return {
                url: uploadRes.url,
                alt: file.originalname || title || "Product Image"
            };
        }));

        let priceAmount = price;
        let currency = "INR";

        if (typeof price === "string") {
            try {
                const parsed = JSON.parse(price);
                if (typeof parsed === "object" && parsed !== null) {
                    priceAmount = parsed.amount ?? price;
                    currency = parsed.currency || "INR";
                }
            } catch (_e) {
                priceAmount = price;
            }
        } else if (typeof price === "object" && price !== null) {
            priceAmount = price.amount;
            currency = price.currency || "INR";
        }

        const product = await productModel.create({
            title,
            description,
            price: {
                amount: String(priceAmount),
                currency
            },
            images,
            seller: seller._id
        });

        return res.status(201).json({
            message: "product created successfully",
            success: true,
            product
        });
    } catch (error) {
        console.error("createProduct error:", error);
        return res.status(500).json({ message: error.message || "Server error" });
    }
}

export async function getSellerProducts(req, res) {
    try {
        const seller = req.user;
        if (!seller) {
            return res.status(401).json({ message: "Unauthorised seller" });
        }

        const products = await productModel.find({
            seller: seller._id
        });

        return res.status(200).json({
            message: "Products fetched Successfully",
            success: true,
            products
        });
    } catch (error) {
        console.error("getSellerProducts error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}