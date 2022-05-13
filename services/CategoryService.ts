import $api from "../api/index"
import { ICategoryService } from "@/interfaces/category"

const CategoryService: ICategoryService = {
    getAll: async () => {
        const response = await $api.get("/category");
        return response.data
    },
    getSearchCategory: async () => {
        const response = await $api.get("/search-category");
        return response.data
    },
    getOne: async (id) => {
        const response = await $api.get(`/category/${id}`);
        return response.data
    },
    create: async (data) => {
        const response = await $api.post("/category", { data });
        return response.data
    },
    update: async (data) => {
        const response = await $api.put("/category", { data });
        return response.data
    }
}

export default CategoryService;
