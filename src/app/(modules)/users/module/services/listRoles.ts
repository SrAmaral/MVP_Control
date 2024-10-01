import { PrismaClient } from "@prisma/client";

export default function listRoles(db:PrismaClient) {
    return db.role.findMany();
}