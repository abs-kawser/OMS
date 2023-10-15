import React, { createContext, useContext, useState } from "react";

const CustomerContex = createContext();

const CustomerProvider = ({ children }) => {
  const [customerInformation, setCustomerInformation] = useState(null);

  return (
    <CustomerContex.Provider value={{customerInformation, setCustomerInformation}}>
      {children}
    </CustomerContex.Provider>
  );
};

export const useCustomerInfo = () => useContext(CustomerContex);

export default CustomerProvider;
