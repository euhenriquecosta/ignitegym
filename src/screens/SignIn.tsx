import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { Center, Heading, Image, useToast, ScrollView, Text, VStack, Spinner } from "@gluestack-ui/themed";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { useAuth } from '@hooks/useAuth';

import Logo from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { ToastMessage } from "@components/ToastMessage";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

import { AppError } from "@utils/AppError";

type FormDataProps = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o email.').email('E-mail inválido'),
  password: yup.string().required('Digite a senha.').min(8, 'A senha deve ter pelo menos 8 digitos'),
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possivel entrar. Tente novamente ou mais tarde.'

      setIsLoading(false);
      
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        )
      })
    }
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          w="$full"
          h={624}
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          position="absolute"
        />
        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />

            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e seu corpo.
            </Text>
          </Center>

          <Center gap="$2">
            <Heading color="$gray100" fontSize="$3xl">Acesse a conta</Heading>

            <Controller
              control={control}
              name="email"
              rules={{ required: 'Informe o e-mail' }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{ required: 'Informe a senha.' }}
              render={({field: {onChange}}) => (
                <Input 
                  placeholder="Senha" 
                  secureTextEntry 
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            
            <Center position="relative" w="100%">
              <Button
                title={isLoading ? "" : "Acessar"}
                onPress={isLoading ? null : handleSubmit(handleSignIn)}
                isDisabled={isLoading}
                opacity={isLoading ? 0.6 : 1} // Ajusta a opacidade quando está carregando
              />
              {isLoading && (
                <Spinner
                  color="$white"
                  position="absolute"
                  size="small"
                />
              )}
            </Center>
          </Center>

          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Text
              color="$gray100"
              fontSize="$sm"
              mb="$3"
              fontFamily="$body"
            >
              Ainda não tem acesso?
            </Text>

            <Button title="Criar Conta" variant="outline" onPress={handleNewAccount} />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}