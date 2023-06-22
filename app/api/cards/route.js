import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (req) => {
  try {
    const channels = await prisma.channel.findMany();
    return new Response(JSON.stringify(channels), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all channels", { status: 500 });
  }
};
