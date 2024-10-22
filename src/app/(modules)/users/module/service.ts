import checkCredentials from "./services/checkCredentials";
import createUser from "./services/createUser";
import listRoles from "./services/listRoles";
import { listUserById, listUsers } from "./services/listUsers";
import updateUser from "./services/updateUser";

export const usersService = {
    listUsers,
    checkCredentials,
    createUser,
    updateUser,
    listRoles,
    listUserById
};