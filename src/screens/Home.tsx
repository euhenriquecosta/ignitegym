import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, Text, HStack } from "@gluestack-ui/themed";
import { useState } from "react";


export function Home() {
  const [groupSelected, setGroupSelected] = useState("costa")

  return (
    <VStack flex={1}>
      <HomeHeader />
      <HStack>
        <Group
          name="Ombro"
          isActive={groupSelected === "ombro"}
          onPress={() => setGroupSelected("ombro")}
        />
        <Group
          name="Costas"
          isActive={groupSelected === "costas"}
          onPress={() => setGroupSelected("costas")}
        />
        <Group
          name="Pezinho"
          isActive={groupSelected === "pezinho"}
          onPress={() => setGroupSelected("pezinho")}
        />
      </HStack>
    </VStack>
  )
}