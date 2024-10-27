import { StatusBar } from 'react-native';
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';

import { GluestackUIProvider, Text, Center } from '@gluestack-ui/themed';
import { config } from './src/config/gluestack-ui.config';
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

  return (
    <GluestackUIProvider config={config}>

      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />

      {fontsLoaded ? (
        <Routes />
      ) : (
        <Loading />
      )}

    </GluestackUIProvider>
  );
}