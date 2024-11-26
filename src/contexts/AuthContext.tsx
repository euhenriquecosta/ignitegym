import { createContext, ReactNode, useEffect, useState } from "react";

import { storageUserGet, storageUserSave, storageUserRemove } from "@storage/storageUser";

import { api } from "@services/api";
import { UserDTO } from "@dtos/UserDTO";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";


export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContexProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContexProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    const treatedToken = token.replaceAll('"', '') // Remove as " para não influenciar no header
    api.defaults.headers.common['Authorization'] = `Bearer ${treatedToken}`
    
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string, refresh_token: string) {
    try {
      await storageUserSave(userData);
      await storageAuthTokenSave(token, refresh_token);
    } catch (error) {
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenSave(data.user, data.token, data.refresh_token);

        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }


  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);

      setUser({} as UserDTO)
      await storageUserRemove();
      await storageAuthTokenRemove();

    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);
      
      const { token } = await storageAuthTokenGet();
      const userLogged = await storageUserGet();

      console.log(token);
      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }

  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerIntereptTokenManager(signOut);

    return () => {
      subscribe();
    }
  }, [signOut]);

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      updateUserProfile,
      isLoadingUserStorageData,
    }}>
      {children}
    </AuthContext.Provider>
  );
}