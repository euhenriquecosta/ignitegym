import { useState } from "react";
import { FlatList } from "react-native";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, Text, HStack, Heading } from "@gluestack-ui/themed";
import { ExerciseCard } from "@components/ExerciseCard";


export function Home() {
  const [groups, setGroups] = useState(["Costas", "Biceps", "Triceps", "Ombro"])
  const [exercises, setExercises] = useState([
    "Remada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
    "Supino Reto",
    "Supino Inclinado",
    "Biceps Martelo",
  ])
  const [groupSelected, setGroupSelected] = useState("costa")


  return (
    <VStack flex={1}>

      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
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
      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
            Exercicios
          </Heading>

          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            4
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={() => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}