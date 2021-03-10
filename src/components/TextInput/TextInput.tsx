import { TextInputBaseProps } from './types';
import UnderlineTextInput from './UnderlineTextInput';
import ContainedTextInput from './ContainedTextInput';

interface TextInputProps extends TextInputBaseProps {
  variant?: 'underline' | 'contained';
}

const variantMap = {
  underline: UnderlineTextInput,
  contained: ContainedTextInput
};

const TextInput = ({ variant = 'underline', ...rest }: TextInputProps) => {
  const InputComponent = variantMap[variant];
  return <InputComponent {...rest} />;
};

export default TextInput;
