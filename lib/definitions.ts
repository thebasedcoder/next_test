export type ActionState = {
  status: 'success' | 'error' | '';
  message: string;
};

// This is the type directly from your Prisma query (server-side)
export type ServerComment = {
  id: number;
  text: string;
  createdAt: Date;
  author: { name: string | null };
};

// This is the type after it has been passed to a Client Component
export type ClientComment = {
  id: number;
  text: string;
  createdAt: string; // The Date object is now a string
  author: { username: string | null };
};