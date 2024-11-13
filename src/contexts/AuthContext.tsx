import { createContext, ReactNode } from "react";
import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
}

type AuthContexProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContexProviderProps) {
  return (
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Henrique',
        email: 'user@email.com',
        avatar: 'avatar.png'
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
}