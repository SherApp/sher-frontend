import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element[];
}

const DialogContent = ({ children, ...rest }: Props) => (
  <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3" {...rest}>
    {children}
  </div>
);

export default DialogContent;
