import Handwriting from './Handwriting';
import clsx from 'clsx';

interface NamedContainerProps {
  title?: string;
  className?: string;
}

const NamedContainer = ({
  children,
  className,
  title
}: React.PropsWithChildren<NamedContainerProps>) => {
  return (
    <div className={clsx('container mt-40', className)}>
      <Handwriting variant="h2" component="h1">
        {title}
      </Handwriting>
      {children}
    </div>
  );
};

export default NamedContainer;
