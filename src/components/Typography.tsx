import React from 'react';
import clsx from 'clsx';

type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'caption'
  | 'sm'
  | 'srOnly';

export interface TypographyProps
  extends React.ComponentPropsWithoutRef<'span'> {
  variant?: TypographyVariants;
  component?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'div'
    | 'p'
    | 'span'
    | string;
  handwriting?: boolean;
}

type VariantClassesMap = { [key in TypographyVariants]: string };

export const typographyVariantsClasses: VariantClassesMap = {
  h1: 'text-8xl',
  h2: 'text-6xl',
  h3: 'text-4xl',
  h4: 'text-2xl font-medium',
  h5: 'text-xl font-medium',
  h6: 'text-xl',
  body: 'text-base',
  caption: 'uppercase',
  sm: 'text-sm',
  srOnly: 'sr-only'
};

const Typography = ({
  variant = 'body',
  component = 'span',
  className,
  handwriting,
  children,
  ...rest
}: TypographyProps) => {
  const classes = clsx(
    typographyVariantsClasses[variant],
    [handwriting && 'font-handwriting'],
    className
  );
  return React.createElement(component, {
    children,
    className: classes,
    ...rest
  });
};

export default Typography;
