import { PrismaClient } from "@prisma/client";
import { parse } from "url";
const prisma = new PrismaClient();

export const GET = async (req, res) => {
  try {
    const { query } = parse(req.url, true);
    const { title, theme, language, geo, type } = query;

    // console.log("title", title);
    // console.log("theme", theme);
    // console.log("language", language);
    // console.log(query);
    // console.log(geo)
    // console.log(type)
    if (title && !theme && !language && !geo && !type) {
      const channels = await prisma.channel.findMany({
        where: { name: title || "" },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (theme && !title && !language && !geo && !type) {
      const channels = await prisma.channel.findMany({
        where: { theme: theme || "" },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && !theme && !title && !geo && !type) {
      const channels = await prisma.channel.findMany({
        where: { language: language || "" },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && theme && !title && !geo && !type) {
      const channels = await prisma.channel.findMany({
        where: {
          theme: theme || "",
          language: language || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (title && theme && !language && !geo && !type) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          theme: theme || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && title && !theme && !geo && !type) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          language: language || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && title && theme && !geo && !type) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          theme: theme || "",
          language: language || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (geo && !title && !theme && !language && !type) {
      const channels = await prisma.channel.findMany({
        where: { geolocation: geo || "" },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (type && !title && !theme && !language && !geo) {
      const channels = await prisma.channel.findMany({
        where: { type: type || "" },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (geo && type && !title && !theme && !language) {
      const channels = await prisma.channel.findMany({
        where: {
          geolocation: geo || "",
          type: type || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (title && geo && !theme && !language && !type) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          geolocation: geo || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (title && type && !theme && !language && !geo) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          type: type || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (theme && geo && !title && !language && !type) {
      const channels = await prisma.channel.findMany({
        where: {
          theme: theme || "",
          geolocation: geo || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (theme && type && !title && !language && !geo) {
      const channels = await prisma.channel.findMany({
        where: {
          theme: theme || "",
          type: type || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && geo && !title && !theme && !type) {
      const channels = await prisma.channel.findMany({
        where: {
          language: language || "",
          geolocation: geo || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && type && !title && !theme && !geo) {
      const channels = await prisma.channel.findMany({
        where: {
          language: language || "",
          type: type || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (geo && type && !title && !theme && !language) {
      const channels = await prisma.channel.findMany({
        where: {
          geolocation: geo || "",
          type: type || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (title && theme && geo && !language && !type) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          theme: theme || "",
          geolocation: geo || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (title && theme && type && !language && !geo) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          theme: theme || "",
          type: type || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (title && language && geo && !theme && !type) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          language: language || "",
          geolocation: geo || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (title && language && type && !theme && !geo) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          language: language || "",
          type: type || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (theme && language && geo && !title && !type) {
      const channels = await prisma.channel.findMany({
        where: {
          theme: theme || "",
          language: language || "",
          geolocation: geo || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (theme && language && type && !title && !geo) {
      const channels = await prisma.channel.findMany({
        where: {
          theme: theme || "",
          language: language || "",
          type: type || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && title && theme && geo && !type) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          theme: theme || "",
          language: language || "",
          geolocation: geo || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && title && theme && type && !geo) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          theme: theme || "",
          language: language || "",
          type: type || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else {
      const channels = await prisma.channel.findMany();
      return new Response(JSON.stringify(channels), { status: 200 });
    }
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
