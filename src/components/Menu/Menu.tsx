import React from 'react';
import clsx from 'clsx';

interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  open?: boolean;
}

const Menu = (
  { className, open, children, ...rest }: MenuProps,
  ref: React.Ref<HTMLUListElement>
) => {
  const menuClasses = clsx(
    [!open && 'invisible'],
    'text-white shadow-xl rounded-xl overflow-hidden bg-gradient-tr-purple-pink absolute b-0 w-max transition-opacity duration-300 left-1/2 -translate-x-1/2 transform',
    open ? 'opacity-100' : 'opacity-0',
    className
  );

  return (
    <ul ref={ref} className={menuClasses} role="menu" {...rest}>
      {children}
    </ul>
  );
};

export default React.forwardRef(Menu);
