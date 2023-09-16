import { useEffect } from 'react';
import { useStore } from '../../store';
import { themes } from '../../utils/constants';

export const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
export const isBrowserDefaultDark = () => preferredColorScheme.matches;

export const useTheme = () => {
  const { userSettings } = useStore();

  const handleThemeChange = () => {
    const getDefaultTheme = () => {
      const localStorageTheme = userSettings.theme;
      const browserDefault = isBrowserDefaultDark() ? themes.DARK : themes.LIGHT;
      if (localStorageTheme === themes.DEFAULT) {
        return browserDefault;
      }
      return localStorageTheme || browserDefault;
    };
    document.body.classList.remove(document.body.classList.contains(themes.DARK) ? themes.DARK : themes.LIGHT);
    document.body.classList.add(getDefaultTheme());
  };

  useEffect(() => {
    handleThemeChange();
  }, [userSettings.theme]);

  useEffect(() => {
    preferredColorScheme.addEventListener('change', handleThemeChange);
    return () => {
      preferredColorScheme.removeEventListener('change', handleThemeChange);
    };
  }, []);
};
