import { db } from "~/core/db";

export function listUsersService() {
    return db.user.findMany();
}