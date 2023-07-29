import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== "POST" &&
    req.method !== "GET" &&
    req.method !== "DELETE" &&
    req.method !== "PUT"
  ) {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body, image } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          image,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      // console.log({ userId })

      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(posts);
    }

    if (req.method === "DELETE") {
      const { postId } = req.query;

      const post = await prisma.post.delete({
        where: {
          id: postId as string,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "PUT") {
      const { postId } = req.query;
      const { body } = req.body;

      const post = await prisma.post.update({
        where: {
          id: postId as string,
        },
        data: {
          body,
        },
      });

      return res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
