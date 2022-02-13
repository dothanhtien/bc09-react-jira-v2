import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
