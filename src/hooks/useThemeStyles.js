import useTheme from "./useTheme";

const useThemeStyles = (styles) => {
  const theme = useTheme();
  return styles(theme);
};

export default useThemeStyles;
