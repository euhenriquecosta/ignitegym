import { createContext, ReactNode, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";

type signInProps = {
  email: string;
  password: string;
}

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void
}

type AuthContexProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContexProviderProps) {
  const [user, setUser] = useState<UserDTO>({
      id: '1',
      name: 'teste',
      email: 'user@email.com',
      avatar: 'avatar.png'
    })

  function signIn(email: string, password: string) {
    setUser({
      id: '',
      name: '',
      email,
      avatar: '',
    });
  }
  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}