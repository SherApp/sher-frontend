export interface TextInputBaseProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  endAdornment?: JSX.Element;
}
