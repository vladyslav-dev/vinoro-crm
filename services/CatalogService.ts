import $api from "../api/index"
import { ICatalogService } from "@/interfaces/catalog"

const CatalogService: ICatalogService = {
    getAll: async () => {
        const response = await $api.get("/catalog");
        return response.data;
    },
    createCatalog: async (data) => {
        const response = await $api.post("/catalog", { data });
        return response.data;
    }
}

export default CatalogService;
