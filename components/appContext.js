import { createContext, useContext } from 'react';

/**
 * Pass page props context deeply to search component.
 * Each page must have the function getStaticProps 
 * and call getSortedPostsData for the search to work on that page.
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