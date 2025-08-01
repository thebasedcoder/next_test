'use client'

import React, { CSSProperties } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

interface ButtonProps {
  pending: boolean;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function SubmitButton({ pending, children, className, style }: ButtonProps) {
  return (
    <button disabled={pending} type="submit" className={className} style={style}>
      {pending ? <LoadingSpinner /> : children}
    </button>
  )
}