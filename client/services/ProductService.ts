import $api from "../api/index"
import { IProductService } from "@/interfaces/product"

const ProductService: IProductService = {
    getAll: async () => {
        const response = await $api.get("/products");
        return response.data.products;
    },
    getByCategoryId: async (categoryId) => {
        const response = await $api.get(`/category-products/${categoryId}`);
        return response.data.products
    },
    getOne: async (id) => {
        const response = await $api.get(`/product/${id}`);
        return response.data.product;
    },
    getDiscountedProducts: async () => {
        const response = await $api.get(`/discounted-products`);
        return response.data.products;
    },
    getNewProducts: async () => {
        const response = await $api.get(`/new-products`);
        return response.data.products;
    },
    create: async (product) => {
        const response = await $api.post("/product", { data: product });
        return response.data.product
    },
    update: async (product) => {
        const response = await $api.put("/product", { data: product });
        return response.data.product
    },
    updateProductOrder: async (products) => {
        const response = await $api.put("/product-order", { data: products });
        return response;
    }
}

export default ProductService;
