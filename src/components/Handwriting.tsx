import Typography, { TypographyProps } from './Typography';

const Handwriting = ({ children, ...rest }: TypographyProps) => {
  return (
    <Typography {...rest}>
      <span className="text-gradient bg-gradient-r-purple-pink px-2">
        {children}
      </span>
    </Typography>
  )
};

export default Handwriting;
