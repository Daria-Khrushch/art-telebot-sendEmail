import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const data = await req.json();
    const newChannel = await prisma.channel.create({
      data,
    });

    return new Response(JSON.stringify(newChannel), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
