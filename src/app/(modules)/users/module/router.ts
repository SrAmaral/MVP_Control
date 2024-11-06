import { createTRPCRouter } from "~/core/trpc/trpc";
import { CheckCredentials } from "./procedures/checkCredentials";
import { CreateUser } from "./procedures/createUser";
import { ListFiles } from "./procedures/listFiles";
import { ListRoles } from "./procedures/listRoles";
import { ListUserById, ListUsers } from "./procedures/listUsers";
import { UpdateUser } from "./procedures/updateUser";

export const usersRouter = createTRPCRouter({
    checkCredentials:CheckCredentials,
    listUsers:ListUsers,  
    createUser:CreateUser,
    updateUser:UpdateUser,
    listRoles:ListRoles,
    listUserById:ListUserById,
    listFiles: ListFiles,
});