import React from 'react';
import clsx from 'clsx';

type TypographyVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption';

export interface TypographyProps extends React.ComponentPropsWithoutRef<'span'> {
  variant? : TypographyVariants;
  component? : 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span' | string;
}

type VariantClassesMap = { [key in TypographyVariants]: string };

export const typographyVariantsClasses: VariantClassesMap = {
  h1: 'font-handwriting text-8xl',
  h2: 'font-handwriting text-6xl',
  h3: 'font-handwriting text-4xl',
  h4: 'text-2xl font-medium',
  h5: 'text-xl font-medium',
  h6: 'text-xl',
  body: 'text-base',
  caption: 'uppercase tracking-widest'
};

const Typography = ({ variant = 'body', component = 'span', className, children, ...rest }: TypographyProps) => {
  const classes = clsx(typographyVariantsClasses[variant], className);
  return React.createElement(component, { children, className: classes, ...rest });
};

export default Typography;
