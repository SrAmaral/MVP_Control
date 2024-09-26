import { PrismaClient } from "@prisma/client";

export function listUsers(db: PrismaClient) {
    return db.user.findMany({
        include: {
            address: true,
            role: true
        }
        });
}