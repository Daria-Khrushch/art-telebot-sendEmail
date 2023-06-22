import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (req) => {
    try {
      
        const data = await req.json();
        // console.log(data)
        const newPurchase = await prisma.buyer.create({
      data,
    });

    return new Response(JSON.stringify(newPurchase), { status: 200 });
    } catch (error) {
        console.log(error)
    return new Response("Failed to create a new purchase", { status: 500 });
  }
};