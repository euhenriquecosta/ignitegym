import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, Text, SectionList, Heading } from "@gluestack-ui/themed";
import { useState } from "react";

type ExerciseHistorySection = {
  title: string;
  data: string[];
}

export function History() {
  const [exercises, setExercises] = useState<ExerciseHistorySection[]>([
    {
      title: "22.07.24",
      data: ["Puxada frontal", "Remada unilateral"],
    },
    {
      title: "23.07.24",
      data: ["Puxada frontal"],
    },
    {
      title: "23.08.24",
      data: ["Puxada frontal"],
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={(item: any) => item}
        renderItem={() => <HistoryCard />}
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
    </VStack>
  )
}