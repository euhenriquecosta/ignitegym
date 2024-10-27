import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthRotes } from "./auth.routes";

import { gluestackUIConfig } from "@gluestack-ui/config";


export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.trueGray900

  return (
    <NavigationContainer>
      <AuthRotes></AuthRotes>
    </NavigationContainer>
  )
}