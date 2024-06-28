import { createContext, useContext, useState } from 'react';

/**
 * Pass page props context deeply to search component.
 * This context handles changes in theme and passes props deeply to ThemeToggle.
 */
const AppContext = createContext(null);

export const AppWrapper = ({ children }) => {
  const [isDarkTheme, setCurrentTheme] = useState(false);

  function handleTheme(setValue) {
    if (setValue !== null && setValue !== undefined) {
      setCurrentTheme(setValue);
      return;
    }

    const curTheme = isDarkTheme;
    if (curTheme) {
      document?.documentElement?.setAttribute('data-theme', 'light');
      window?.localStorage?.setItem('data-theme', 'light');
    } else {
      document?.documentElement?.setAttribute('data-theme', 'dark');
      window?.localStorage?.setItem('data-theme', 'dark');
    }
    setCurrentTheme(!isDarkTheme);
  }

  const sharedState = {
    isDarkTheme: isDarkTheme,
    handleTheme: handleTheme
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