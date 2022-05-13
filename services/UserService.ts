import $api from "../api/index";

export default class UserService {
  static fetchUsers() {
    return $api.get("/users");
  }
}
