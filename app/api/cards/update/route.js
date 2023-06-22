import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (req) => {
  const updatedAtInput = {
    set: new Date(),
  };
  try {
    const data = await req.json();
     const { id, ...dataWithoutId } = data;
    const updatedChannel = await prisma.channel.update({
      where: { id: data.id },
      data: { updated_at: updatedAtInput, ...dataWithoutId },
    });

    return new Response(JSON.stringify(updatedChannel), { status: 200 });
  } catch (error) {
     console.log(error)
    return new Response(error, { status: 500 });
  }
};
