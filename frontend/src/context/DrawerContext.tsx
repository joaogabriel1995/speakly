import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

export interface IDrawerProvider{
    children: ReactNode;
  }
  interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
  }

  const DrawerContext = createContext({} as IDrawerContextData);

  export const useDrawerContext = () => {
    return useContext(DrawerContext);
  };

export const DrawerProvider: React.FC<IDrawerProvider> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);


  return (
    <DrawerContext.Provider value={{ isDrawerOpen,  toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
