import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  private static instance: PrismaClient


  public static getInstance() {
    if (!PrismaService.instance) return new PrismaClient()
    return PrismaService.instance
  }
}

const prisma = new PrismaService()

export default prisma
