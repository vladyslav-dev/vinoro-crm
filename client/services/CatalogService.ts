import $api from "../api/index"
import { ICatalog, ICatalogData } from "@/interfaces/catalog"

export interface ICatalogService {
    getCatalog: () => Promise<ICatalog>;
    createCatalog: (data: ICatalogData) => Promise<ICatalog>;
    updateCatalog: (data: ICatalogData) => Promise<ICatalog>;
}

const CatalogService: ICatalogService = {
    getCatalog: async () => {
        return await $api.get("/catalog");
    },
    createCatalog: async (data) => {
        return await $api.post("/catalog", { data });
    },
    updateCatalog: async (data) => {
        return await $api.put("/catalog", { data });
    }
}

export default CatalogService;
