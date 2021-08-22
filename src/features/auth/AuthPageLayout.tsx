import React from 'react';
import Handwriting from '../../components/Handwriting';

const AuthPageLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="w-full justify-center items-center flex flex-col flex-grow my-10">
      <div className="md:w-2/5 2xl:w-1/4 relative">
        <div className="px-8 py-10 shadow-xl bg-white dark:bg-gray-800 rounded-xl text-center">
          <Handwriting variant="h3" component="h1" className="mb-2">
            Sher
          </Handwriting>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthPageLayout;
