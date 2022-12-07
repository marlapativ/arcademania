import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "../../store/store";
import * as userPreferencesService from "lib/services/user-preference-service";
import { getAuthState } from "lib/store/slices/authSlice";
import {
  getUserPreferences,
  setUserPreferenceTheme,
} from "lib/store/slices/userPreferencesSlice";
import { isAuthenticated } from "lib/utils/tokenUtils";

/**
 * Theme toggling Component.
 *
 * @returns ThemeToggle Button.
 */
const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const authState = useSelector(getAuthState);
  const userPreferenceState = useSelector(getUserPreferences);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userPreferenceState.theme !== colorMode) toggleColorMode();
  }, [
    colorMode,
    toggleColorMode,
    userPreferenceState,
    userPreferenceState.theme,
  ]);

  const updateUserPreference = () => {
    // If User is not authenticated ignore.
    if (!isAuthenticated(authState)) {
      return;
    }
    const color = userPreferenceState.theme === "light" ? "dark" : "light";

    userPreferencesService
      .saveUserPreferences(color, userPreferenceState.recentlyPlayed)
      .then(() => {
        dispatch(
          setUserPreferenceTheme({
            theme: color,
          })
        );
      });
  };

  return (
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={() => {
        updateUserPreference();
      }}
    />
  );
};

export default ThemeToggle;
