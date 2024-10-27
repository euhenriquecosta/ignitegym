import { Text, View, StatusBar } from 'react-native';
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#202024" }}>


      <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />

      {fontsLoaded ? <Text>Home</Text> : <View />}
    </View>
  );
}