export interface TextInputBaseProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  hint?: string;
  endAdornment?: JSX.Element;
}
