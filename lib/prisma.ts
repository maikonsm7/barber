import { PrismaClient } from "@prisma/client";
import {PrismaPg} from "@prisma/adapter-pg"

let prisma: PrismaClient
if(process.env.NODE_ENV === "production"){
  prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
  })
}else{
  let globalWhithPrisma = global as typeof globalThis & {
    prisma: PrismaClient
  }

  if(!globalWhithPrisma.prisma){
    globalWhithPrisma.prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
    })
  }

  prisma = globalWhithPrisma.prisma
}

export default prisma
