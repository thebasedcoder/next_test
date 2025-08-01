"use server"

import prisma from '@/lib/prisma';
import { getSession } from './auth';

export async function getUserPosts() {
  const session = await getSession();

  if (!session?.userId) {
    // If there's no user session, return an empty array
    return [];
  }

  try {
    const posts = await prisma.post.findMany({
      // Use 'where' to filter posts by the authorId
      where: {
        authorId: parseInt(session.userId),
      },
      orderBy: {
        createdAt: 'desc', // Show newest posts first
      },
    });
    return posts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user posts.');
  }
}

export async function getAllPosts() {
  try {
    // This fetches ALL posts because there is no 'where' filter.
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: { username: true }, // Gets the author's name for each post
        },
      },
    });
    return posts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts.');
  }
}

export async function getPostById(id: number) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { username: true },
        },
      },
    });
    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post.');
  }
}

export async function getPostCount() {
  const session = await getSession();

  // 2. If no user is logged in, return 0
  if (!session?.userId) {
    return 0;
  }

  try {
    // 3. Use a 'where' clause to count posts for the specific user
    const count = await prisma.post.count({
      where: {
        authorId: parseInt(session.userId),
      },
    });
    return count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post count.');
  }
}

export async function getCommentsByPostId(postId: number, page: number = 1, pageSize: number = 10) {
  try {
    const skip = (page - 1) * pageSize;

    // Fetch a paginated list of comments
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { author: { select: { username: true } } },
      orderBy: { createdAt: 'desc' },
      take: pageSize,
      skip: skip,
    });

    // Also get the total count of comments for the post
    const totalComments = await prisma.comment.count({
      where: { postId },
    });

    return { comments, totalComments };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comments.');
  }
}

export async function getCommentCountForUserPosts() {
  const session = await getSession();
  if (!session?.userId) {
    return 0;
  }

  const userId = parseInt(session.userId);

  try {
    // This is a relational filter: it counts comments where the
    // related post's authorId matches the current user's ID.
    const count = await prisma.comment.count({
      where: {
        post: {
          authorId: userId,
        },
      },
    });
    return count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comment count.');
  }
}