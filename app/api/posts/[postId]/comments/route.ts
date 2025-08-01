import { NextResponse } from 'next/server';
import { getCommentsByPostId } from '@/lib/data';


export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const awaitedParams = await params
  const { postId: postIdString } = awaitedParams;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const postId = parseInt(postIdString, 10);

  const { comments, totalComments } = await getCommentsByPostId(postId, page);

  return NextResponse.json({ comments, totalComments });
}