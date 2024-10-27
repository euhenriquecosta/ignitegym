import { useState } from "react";
import { FlatList } from "react-native";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, Text, HStack } from "@gluestack-ui/themed";


export function Home() {
  const [groups, setGroups] = useState(["Costas", "Biceps", "Triceps", "Ombro"])
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
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{
          marginVertical: 40,
          maxHeight: 44,
          minHeight: 44
        }}
      />
    </VStack>
  )
}