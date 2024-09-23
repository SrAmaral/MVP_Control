import { createTRPCRouter } from "~/core/trpc/trpc";
import { getUsers} from "./procedures/getUsers";
import { checkCredentials } from "./procedures/checkCredentials";
import { listUsersService } from "./services/listUsers";
import { listUsers } from "./procedures/listUsers";

export const usersRouter = createTRPCRouter({
    getUsers,
    checkCredentials,
    listUsers,
});

export const usersService = {
    listUsersService,
};