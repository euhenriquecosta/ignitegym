import { StatusBar } from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';

import { Routes } from '@routes/index';

import { AuthContext } from '@contexts/AuthContext';

import { config } from './src/config/gluestack-ui.config';
import { Loading } from '@components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

  return (
    <GluestackUIProvider config={config}>

      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />

      <AuthContext.Provider value={{
        user: {
          id: '1',
          name: 'Henrique',
          email: 'user@email.com',
          avatar: 'avatar.png'
        }
      }}>
        {fontsLoaded ? (
          <Routes />
        ) : (
          <Loading />
        )}
      </AuthContext.Provider>

    </GluestackUIProvider>
  );
}