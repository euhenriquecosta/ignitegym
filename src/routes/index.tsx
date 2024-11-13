
import { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthContext } from "@contexts/AuthContext";

import { AuthRotes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { gluestackUIConfig } from "../config/gluestack-ui.config";
import { Box } from "@gluestack-ui/themed";


export function Routes() {
  const contextData = useContext(AuthContext);
  console.log("USUÁRIO LOGADO =>", contextData)

  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.trueGray800

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        <AuthRotes />
      </NavigationContainer>
    </Box>
  )
}