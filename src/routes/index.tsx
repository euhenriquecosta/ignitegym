import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";

import { AuthRotes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { gluestackUIConfig } from "../config/gluestack-ui.config";
import { Box } from "@gluestack-ui/themed";
import { Loading } from "@components/Loading";


export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.trueGray800

  if(user === null && isLoadingUserStorageData) {
    return <Loading />
  }
  
  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRotes /> }
      </NavigationContainer>
    </Box>
  )
}