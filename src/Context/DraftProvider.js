import React, { createContext, useContext, useState } from "react";

const DraftContext = createContext();

const DraftProvider = ({ children }) => {
  const [draftData, setDraftData] = useState([]);

  return (
    <DraftContext.Provider value={{draftData, setDraftData}}>
      {children}
    </DraftContext.Provider>
  );
};

export const useDraft = () => useContext(DraftContext);

export default DraftProvider;