import $api from "../api/index"
import { IUserLogin } from "@/interfaces/auth"

export interface IAuthService {
  login: (data: IUserLogin) => any;
  logout: () => any;
  checkAuth: () => any;
}

const AuthService: IAuthService = {
  login:  async ({ login, password }) => {
    return $api.post("/login", { login, password });
  },
  logout: async () => {
    return $api.post("/logout")
  },
  checkAuth: async () => {
    return await $api.get(`/refresh`)
  }
}

export default AuthService;
