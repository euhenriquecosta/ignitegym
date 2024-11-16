import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";

import { VStack, Text, HStack, Heading, useToast, Spinner } from "@gluestack-ui/themed";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import { ToastMessage } from "@components/ToastMessage";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState("");
  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);
      setGroupSelected(response.data[0])
      
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.';
      
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

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true); 

      const response = await api.get(`exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios'
      
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
  
  
  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate("exercise", { exerciseId })
  }

  useEffect(() => {
    fetchGroups();
  }, [])

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup();
  },  [groupSelected]))

  return (
    <VStack flex={1}>

      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 32
        }}
        style={{
          marginVertical: 40,
          maxHeight: 44,
          minHeight: 44
        }}
      />
      { isLoading ? <Loading /> :
      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
            Exercicios
          </Heading>

          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            {exercises.length}
          </Text>
        </HStack>
        
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={( { item } ) => 
            <ExerciseCard 
              data={item}
              onPress={() => handleOpenExerciseDetails(item.id)}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>

      }
    
    </VStack>
  )
}