
import { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";

import { AuthRotes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { gluestackUIConfig } from "../config/gluestack-ui.config";
import { Box } from "@gluestack-ui/themed";


export function Routes() {
  const { user } = useAuth()

  console.log("USUÁRIO LOGADO =>", user)

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