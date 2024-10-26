import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthRotes } from "./auth.routes";

import { gluestackUIConfig } from "@gluestack-ui/config";
import { Box } from "@gluestack-ui/themed";


export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.trueGray800

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        <AuthRotes></AuthRotes>
      </NavigationContainer>
    </Box>
  )
}