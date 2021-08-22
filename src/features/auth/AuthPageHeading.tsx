import React from 'react';
import Typography from '../../components/Typography';

const AuthPageHeading = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Typography variant="h4" component="h2" className="my-4 font-bold">
      {children}
    </Typography>
  );
};

export default AuthPageHeading;
