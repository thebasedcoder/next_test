"use server";

import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { createSession } from '@/lib/auth';
import type { ActionState } from '@/lib/definitions';


export async function loginAction(
  previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. Basic Validation
  if (!email || !password) {
    return { status: 'error', message: 'Email and password are required.' };
  }

  // 2. Wrap ONLY the database query in a try/catch
  let user;


  try {
    user = await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error('Database Error:', error);
    return { status: 'error', message: 'Failed to connect to the database.' };
  }

  // 3. Perform credential checks
  if (!user) {
    return { status: 'error', message: 'Invalid credentials.' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { status: 'error', message: 'Invalid credentials.' };
  }

  // 4. If all checks pass, create session and redirect
  await createSession(user.id.toString(), user.username!);
  return { status: 'success', message: 'Login successful' };

}

export async function signupAction(
  previousState: ActionState,
  formData: FormData
): Promise<ActionState> {

  const email = formData.get('email');
  const username = formData.get('username');
  const password = formData.get('password');

  // 1. Server-side validation
  if (typeof email !== 'string' || !email.includes('@')) {
    return { status: 'error', message: 'Please enter a valid email.' };
  }
  if (typeof username !== 'string' || username.length < 3) {
    return { status: 'error', message: 'Username must be at least 3 characters.' };
  }
  if (typeof password !== 'string' || password.length < 8) {
    return { status: 'error', message: 'Password must be at least 8 characters.' };
  }

  try {
    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { status: 'error', message: 'A user with this email already exists.' };
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the new user in the database
    await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    return { status: 'success', message: 'Account created successfully! Please log in.' };

  } catch (e) {
    console.error(e);
    return { status: 'error', message: 'An unexpected error occurred. Please try again.' };
  }
}