interface MenuItemProps {
  onClick?: () => void;
}

const MenuItem = ({
  children,
  onClick
}: React.PropsWithChildren<MenuItemProps>) => {
  return (
    <li>
      <button
        onClick={onClick}
        className="p-3 tracking-wider hover:bg-gray-100 hover:bg-opacity-50 transition-colors w-full"
      >
        {children}
      </button>
    </li>
  );
};

export default MenuItem;
