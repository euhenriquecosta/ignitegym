import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { VStack, Center, Text, Heading, useToast, onChange } from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppError } from "@utils/AppError";
import { api } from "@services/api";

import { Controller, useForm } from "react-hook-form";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ToastMessage } from "@components/ToastMessage";

import { useAuth } from "@hooks/useAuth";

const PHOTO_SIZE = 35;


const changePerfilSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().optional(),
  password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .min(8, 'A senha atual deve ter pelo menos 8 dígitos.')
    .when(['new_password', 'confirm_new_password'], {
      is: (newPassword: string | null, confirmNewPassword: string | null) => !!newPassword && !!confirmNewPassword, // Se o campo "new_password e confirm_new_password" estiver preenchido
      then: (schema) => schema.required('É necessário que preencha a senha atual.'),
      otherwise: (schema) => schema.notRequired(),
    }),
  new_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .min(8, 'A nova senha deve ter pelo menos 8 dígitos.'),
  confirm_new_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref('new_password')], 'A confirmação da nova senha não confere.')
    .when('new_password', {
      is: (newPassword: string | null) => !!newPassword, // Se "new_password" estiver preenchido
      then: (schema) => schema.required('A confirmação da nova senha é obrigatória.'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

type FormDataProps = yup.InferType<typeof changePerfilSchema>;

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState("https://github.com/euhenriquecosta.png");

  const toast = useToast();
  const { user } = useAuth();

  const { control, handleSubmit, formState: { errors }} = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(changePerfilSchema)
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })

      if (photoSelected.canceled) {
        return
      }

      const photoURI = photoSelected.assets[0].uri
      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number
        }

        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > PHOTO_SIZE) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Essa imagem é muito grande. Escolha uma de até 5MB"
                onClose={() => toast.close(id)}
              />
            )
          })

        }

        setUserPhoto(photoURI)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsLoading(true);

      const body = {
        name: data.name,
        password: data.new_password,
        old_password: data.password
      }

      const response = await api.put('/users', body)

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Perfil atualizado com sucesso!"
            onClose={() => toast.close(id)}
          />
        )
      })
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: userPhoto }}
            alt="Foto do usuário"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>


          <Center w="$full" gap="$4">
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { value } }) => (
                <Input
                  placeholder={value}
                  bg="$gray600"
                  isReadOnly
                  value={value}
                />
              )}
            />
          </Center>

          <Heading alignSelf="flex-start" fontFamily="$heading" color="$gray200" fontSize="$md" mt="$12" mb="$12">
            Alterar senha
          </Heading>

          <Center w="$full" gap="$4">
            <Controller 
              control={control}
              name="password"
              render={({ field: {onChange} })=> (
                <Input
                  placeholder="Senha atual" 
                  bg="$gray600"
                  onChangeText={onChange}
                  secureTextEntry 
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller 
              control={control}
              name="new_password"
              render={({ field: {onChange} })=> (
                <Input
                  placeholder="Nova senha" 
                  bg="$gray600"
                  onChangeText={onChange}
                  secureTextEntry 
                  errorMessage={errors.new_password?.message}
                />
              )}
            />
            <Controller 
              control={control}
              name="confirm_new_password"
              render={({ field: {onChange} })=> (
                <Input
                  placeholder="Confirme a nova senha" 
                  bg="$gray600"
                  onChangeText={onChange}
                  secureTextEntry 
                  errorMessage={errors.confirm_new_password?.message}
                />
              )}
            />

            <Button title="Atualizar" isLoading={isLoading} onPress={handleSubmit(handleProfileUpdate)} />
          </Center>
        </Center>


      </ScrollView>
    </VStack>
  )
}