"use client"
import Link from "next/link";
import SubmitButton from "../shared/SubmitButton";
import { signupAction } from "@/features/auth/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { ActionState } from "@/lib/definitions";


const initialState: ActionState = {
  status: '',
  message: '',
};

export function SignupForm() {
  // 1. Manage state here, in the form component.
  const [state, action, pending] = useActionState(signupAction, initialState);

  useEffect(() => {
    if (state.status === 'error') {
      toast.error(state.message);
    }
    if (state.status === 'success') {
      toast.success(state.message);
    }
  }, [state]);
  return (
    <div className="auth-layout">
      <div className="card auth-card">
        <div className="text-center">
          <h2>Create your account</h2>
          <p>Enter your information to get started</p>
        </div>

        <form action={action}>
          <div className="form-group">
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                required
                placeholder="example@mail.co"
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="username"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
              />
            </div>
          </div>
          <SubmitButton pending={pending} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Sign Up
          </SubmitButton>
        </form>

        <p className="text-center">
          Already have an account?{' '}
          <Link href="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}