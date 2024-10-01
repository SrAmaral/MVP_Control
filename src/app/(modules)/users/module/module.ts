import { createTRPCRouter } from "~/core/trpc/trpc";
import { CheckCredentials } from "./procedures/checkCredentials";
import { listUsers } from "./services/listUsers";
import { ListUsers } from "./procedures/listUsers";
import checkCredentials from "./services/checkCredentials";
import createUser from "./services/createUser";
import { CreateUser } from "./procedures/createUser";
import updateUser from "./services/updateUser";
import { UpdateUser } from "./procedures/updateUser";
import listRoles from "./services/listRoles";
import { ListRoles } from "./procedures/listRoles";

export const usersRouter = createTRPCRouter({
    checkCredentials:CheckCredentials,
    listUsers:ListUsers,  
    createUser:CreateUser,
    updateUser:UpdateUser,
    listRoles:ListRoles
});

export const usersService = {
    listUsers,
    checkCredentials,
    createUser,
    updateUser,
    listRoles
};