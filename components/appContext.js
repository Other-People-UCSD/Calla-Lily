import { createContext, useContext } from 'react';

/**
 * Pass page props context deeply to search component
 */
const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  let sharedState = {
    api: children.props.allPostsData
  }
  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
}