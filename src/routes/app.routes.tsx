import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";

import { Home } from '@screens/Home';
import { Exercise } from '@screens/Exercise';
import { Profile } from '@screens/Profile';
import { History } from '@screens/History';
import { gluestackUIConfig } from '@gluestack-ui/config';

type AppRoutes = {
  home: undefined;
  exercise: undefined;
  profile: undefined;
  history: undefined;
}

export type AppNavigatorRoutesPros  = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["6"];
  const iconColor = "black"
  
  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false
    }}>
      <Screen
        name='home'
        component={Home}
        options={{ tabBarIcon: () => <HomeSvg fill={ iconColor } width={iconSize} height={iconSize} /> }}
      />
      <Screen
        name='history'
        component={History}
        options={{ tabBarIcon: () => <HistorySvg fill={ iconColor } width={iconSize} height={iconSize} /> }}
      />
      <Screen
        name='profile'
        component={Profile}
        options={{ tabBarIcon: () => <ProfileSvg fill={ iconColor } width={iconSize} height={iconSize} /> }}
      />
      <Screen
        name='exercise'
        component={Exercise}
      />
    </Navigator>
  )
}