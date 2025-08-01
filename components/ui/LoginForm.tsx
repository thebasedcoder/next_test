"use client"

import { loginAction } from "@/features/auth/actions";
import { ActionState } from "@/lib/definitions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import SubmitButton from "../shared/SubmitButton";

const initialState: ActionState = {
  status: '',
  message: '',
};


export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, action, pending] = useActionState(loginAction, initialState);
  useEffect(() => {
    if (state.status === 'error') {
      toast.error(state.message);
    }
    if (state.status === 'success') {
      toast.success(state.message);
      window.location.href = redirectTo;
    }
  }, [state]);


  return (
    <form className="form-group" style={{ gap: '1.5rem' }} action={action}>
      <div className="form-group" style={{ gap: '1rem' }}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@mail.me" />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <label htmlFor="password">Password</label>
          </div>
          <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="••••••••" />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input id="remember-me" name="remember-me" type="checkbox" style={{ height: '1rem', width: '1rem', borderRadius: '0.25rem' }} />
        <label htmlFor="remember-me" style={{ marginLeft: '0.5rem', color: 'var(--fg-muted)' }}>
          Remember me
        </label>
      </div>

      <SubmitButton pending={pending} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
        Sign In
      </SubmitButton>
    </form>
  )
}