import React from 'react';
import css from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger';
  children: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const variantClass =
    variant === 'outline'
      ? css.outline
      : variant === 'danger'
        ? css.danger
        : css.primary;

  const buttonClass = `${css.button} ${variantClass} ${className || ''}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}
