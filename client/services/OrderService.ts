import $api from "../api/index"
import { IOrderService } from "@/interfaces/order"

const OrderService: IOrderService = {
    getAll: async () => {
        const response = await $api.get("/order");
        return response.data;
    },
    getById: async (id: string) => {
        const response = await $api.get(`/order/${id}`);
        return response.data;
    },
    update: async (id: string, data: any) => {
        const response = await $api.put(`/order/${id}`, { data });
        return response.data;
    }
}

export default OrderService;
