import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { ToastMessage } from "@components/ToastMessage";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDto";
import { VStack, Text, SectionList, Heading, useToast } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { storageAuthTokenSave } from "@storage/storageAuthToken";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { Exercise } from "./Exercise";
import { HistoryDTO } from "@dtos/HistoryDTO";


export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  async function fetchHistoryData() {
    try {
      setIsLoading(true);
      const response = await api.get('/history');
      const dataAxios = response.data

      setExercises(dataAxios);
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


  useFocusEffect(useCallback(() => {
    fetchHistoryData();
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico' />
      {isLoading ? <Loading /> :
      <SectionList
        sections={exercises}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (<HistoryCard data={item} />)}
        renderSectionHeader={({ section }: any) => (
          <Heading
            color="$gray200"
            fontSize="$md"
            mt="$10"
            mb="$3"
          >
            {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color="$gray100" textAlign="center">
            Não há exercícios registrados ainda. {"\n"}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
      }
    </VStack>
  )
}