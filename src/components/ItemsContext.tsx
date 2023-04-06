import React, { createContext, useState, useContext } from "react";
import { Item } from "../screens/ItemsList"; // Import the Item interface

interface ItemsContextProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ItemsContext = createContext<ItemsContextProps>({
  items: [],
  setItems: () => {},
});

export const useItems = () => useContext(ItemsContext);

export const ItemsProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};
