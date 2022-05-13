import { IDashboardService } from './../interfaces/dashboard';
import $api from "../api/index"

const DashboardService: IDashboardService = {
    getInfo: async () => {
        const response = await $api.get("/dashboard");
        return response.data.info;
    },
}

export default DashboardService;
