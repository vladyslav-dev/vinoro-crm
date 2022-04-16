import $api from "../api/index"
import { ICategoryService } from "@/interfaces/category"

const CategoryService: ICategoryService = {
    getAll: async () => {
        const response = await $api.get("/category");
        return response.data.category
    },
    getOne: async (id) => {
        const response = await $api.get(`/category/${id}`);
        return response.data.category
    },
    create: async (data) => {
        const response = await $api.post("/category", { data });
        return response.data.category
    },
    update: async (data) => {
        const response = await $api.put("/category", { data });
        return response.data.category
    }
}

export default CategoryService;
