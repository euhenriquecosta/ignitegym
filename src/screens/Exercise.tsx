import { Heading, HStack, Icon, VStack, Text, Box, useToast, Image } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionSvg from '@assets/repetitions.svg'

import { api } from "@services/api";

import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { ToastMessage } from "@components/ToastMessage";

import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

type RouteParamsProps = {
  exerciseId: string;
}
export function Exercise() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingCompletedExerciseLoading, setIsSendingCompletedExerciseLoading] = useState(false);
  const [exercise, setExercise] = useState({} as ExerciseDTO);

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()

  const { exerciseId } = route.params as RouteParamsProps;
  
  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar as informações do exercicio';
      
      toast.show({
        placement: "top",
        render: ({id}) => (
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

  async function handleExerciseCompleted() {
    try {
      setIsSendingCompletedExerciseLoading(true);
      const response = await api.post( '/history', {exercise_id: exerciseId });

      if(response.status === 201) {
        toast.show({
          placement: "top",
          render: ({id}) => (
            <ToastMessage 
              id={id}
              action="success"
              title="Exercício marcado como concluído!"
              onClose={() => toast.close(id)}
            />
          )
        });
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar as informações do exercicio';

      toast.show({
        placement: "top",
        render: ({id}) => (
          <ToastMessage 
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        )
      })

    } finally {
      setIsSendingCompletedExerciseLoading(false);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);


  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <Heading
            color="$gray100"
            fontFamily="$heading"
            fontSize="$lg"
            flexShrink={1}
          >
            {exercise.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />

            <Text color="$gray200" ml="$1" textTransform="capitalize">{exercise.group}</Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? <Loading /> : 
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <VStack p="$8">
          <Image
            source={{
              uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
            }}
            alt="Exercicio"
            mb="$3"
            resizeMode="cover"
            rounded="$lg"
            w="$full"
            h="$80"
          />

          <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
            <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
              <HStack>
                <SeriesSvg />
                <Text color="$gray200" ml="$2">{exercise.series} séries</Text>
              </HStack>
              <HStack>
                <RepetitionSvg />
                <Text color="$gray200" ml="$2">{exercise.repetitions} repetições</Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" onPress={handleExerciseCompleted} isLoading={isSendingCompletedExerciseLoading}/>
          </Box>
        </VStack>
      </ScrollView>
      }
    </VStack>
  )
}