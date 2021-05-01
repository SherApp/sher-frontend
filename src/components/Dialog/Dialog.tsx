interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element[];
}

const Dialog = ({
  children,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}: Props) => {
  return (
    <div
      className="bg-black bg-opacity-50 fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center"
      {...rest}
    >
      <div
        className="rounded overflow-hidden"
        role="dialog"
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
