import $api from "../api/index"
import { IProductService } from "@/interfaces/product"

const ProductService: IProductService = {
    getAll: async () => {
        const response = await $api.get("/products");
        return response.data.products;
    },
    getOne: async (id) => {
        const response = await $api.get(`/product/${id}`);
        return response.data.product;
    },
    create: async (product) => {
        const response = await $api.post("/product", { data: product });
        return response.data.product
    },
    update: async (product) => {
        const response = await $api.put("/product", { data: product });
        return response.data.product
    }
}

export default ProductService;
