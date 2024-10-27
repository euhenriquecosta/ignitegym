import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRotes() {
  return (
    <Navigator>
      <Screen
        name="signIn"
        component={SignIn}
      />
      <Screen
        name="signUp"
        component={SignUp}
      />
    </Navigator>
  )
}