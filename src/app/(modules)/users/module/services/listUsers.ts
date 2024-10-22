import { type PrismaClient } from "@prisma/client";

export function listUsers(db: PrismaClient) {
    return db.user.findMany({
        include: {
            address: true,
            role: true
        }
        });
}

export function listUserById(id: string, db: PrismaClient) {
    return db.user.findUnique({
        where: {
            id
        },
        include: {
            address: true,
            role: true
        }
    });
}