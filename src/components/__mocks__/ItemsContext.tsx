// __mocks__/ItemsContext.tsx

import React from "react";

const ItemsContext = React.createContext({
  items: [],
  setItems: () => {},
});

export const useItems = () => {
  return React.useContext(ItemsContext);
};
