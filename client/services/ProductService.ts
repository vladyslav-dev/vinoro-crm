import $api from "../api/index"
import { IProductService } from "@/interfaces/product"

const ProductService: IProductService = {
    getAll: async () => {
        const response = await $api.get("/products");
        return response.data;
    },
    getSearchProducts: async () => {
        const response = await $api.get("/search-products");
        return response.data;
    },
    getByCategoryId: async (categoryId) => {
        const response = await $api.get(`/category-products/${categoryId}`);
        return response.data
    },
    getProductsByIdList: async (data: string[]) => {
        const response = await $api.get('/search-products-by-ids', { params: { data } });
        return response.data
    },
    getOne: async (id) => {
        const response = await $api.get(`/product/${id}`);
        return response.data;
    },
    getDiscountedProducts: async () => {
        const response = await $api.get(`/discounted-products`);
        return response.data;
    },
    getNewProducts: async () => {
        const response = await $api.get(`/new-products`);
        return response.data;
    },
    create: async (product) => {
        const response = await $api.post("/product", { data: product });
        return response.data
    },
    update: async (product) => {
        const response = await $api.put("/product", { data: product });
        return response.data
    },
    updateProductOrder: async (products) => {
        const response = await $api.put("/product-order", { data: products });
        return response;
    }
}

export default ProductService;
