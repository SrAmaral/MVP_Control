import { createTRPCRouter } from "~/core/trpc/trpc";
import { CheckCredentials } from "./procedures/checkCredentials";
import { CreateUser } from "./procedures/createUser";
import { ListRoles } from "./procedures/listRoles";
import { ListUsers } from "./procedures/listUsers";
import { UpdateUser } from "./procedures/updateUser";

export const usersRouter = createTRPCRouter({
    checkCredentials:CheckCredentials,
    listUsers:ListUsers,  
    createUser:CreateUser,
    updateUser:UpdateUser,
    listRoles:ListRoles
});