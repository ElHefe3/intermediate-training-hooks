import React from 'react';

export const FormContainer: React.FC = ({ children }) => {
  return <div className="flex h-5/6 flex-col justify-center w-1/2">{children}</div>;
};
