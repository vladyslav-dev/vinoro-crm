import $api from "../api/index"
import { ICatalogService } from "@/interfaces/catalog"

const CatalogService: ICatalogService = {
    getAll: async () => {
        const response = await $api.get("/catalog");
        return response.data.catalog;
    },
    getInfo: async () => {
        const response = await $api.get("/catalog-info");
        return response.data.catalogInfo;
    },
    createCatalog: async (data) => {
        const response = await $api.post("/catalog", { data });
        return response.data.catalog;
    },
    updateCatalog: async (id) => {
        const response = await $api.put("/catalog", { id });
        return response.data.catalog;
    }
}

export default CatalogService;
