"use server"

import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import type { ActionState } from '@/lib/definitions';

export async function createPostAction(
  previousState: ActionState,
  formData: FormData
): Promise<ActionState> {

  // 1. Authenticate the user
  const session = await getSession();
  if (!session?.userId) {
    return { status: 'error', message: 'You must be logged in to create a post.' };
  }

  // 2. Validate the form data
  const title = formData.get('title');
  const content = formData.get('content');

  if (typeof title !== 'string' || title.length < 3) {
    return { status: 'error', message: 'Title must be at least 3 characters long.' };
  }
  if (typeof content !== 'string' || content.length < 10) {
    return { status: 'error', message: 'Content must be at least 10 characters long.' };
  }

  // 3. Create the post in the database
  try {
    await prisma.post.create({
      data: {
        title,
        content,
        authorId: parseInt(session.userId), // Prisma expects an integer for the ID
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    return { status: 'error', message: 'Failed to create the post.' };
  }

  // 4. Revalidate the cache for the posts page
  revalidatePath('/posts');

  // 5. Return a success message
  return { status: 'success', message: 'Post created successfully!' };
}


export async function addCommentAction(postId: number, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('You must be logged in to comment.');
  }

  const text = formData.get('commentText') as string;
  if (!text || text.trim().length === 0) {
    throw new Error('Comment cannot be empty.');
  }

  await prisma.comment.create({
    data: {
      text,
      postId,
      authorId: parseInt(session.userId),
    },
  });

  // Revalidate the post page to show the new comment instantly
  revalidatePath(`/posts/${postId}`);
}