import React from 'react';

interface InputAdornmentProps {
  children: React.ReactNode;
}

const InputAdornment = ({ children }: InputAdornmentProps) => {
  return <div className="flex items-center">{children}</div>;
};

export default InputAdornment;
