import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element[];
}

const DialogButtons = ({ children, ...rest }: Props) => (
  <div className="mt-8 space-x-2 flex justify-end" {...rest}>
    {children}
  </div>
);

export default DialogButtons;
