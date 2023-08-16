import { useEffect } from 'react';
import { useStore } from '../../store';
import { themes } from '../../utils/constants';

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');

export const useTheme = () => {
  const { userSettings } = useStore();

  const handleThemeChange = () => {
    const isBrowserDefaultDark = () => colorScheme.matches;
    const getDefaultTheme = () => {
      const localStorageTheme = userSettings.theme;
      const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
      if (localStorageTheme === themes.DEFAULT) {
        return browserDefault;
      }
      return localStorageTheme || browserDefault;
    };
    document.body.classList.remove(document.body.classList.contains('dark') ? 'dark' : 'light');
    document.body.classList.add(getDefaultTheme());
  };

  useEffect(() => {
    handleThemeChange();
  }, [userSettings.theme]);

  useEffect(() => {
    colorScheme.addEventListener('change', handleThemeChange);
    return () => {
      colorScheme.removeEventListener('change', handleThemeChange);
    };
  }, []);
};
