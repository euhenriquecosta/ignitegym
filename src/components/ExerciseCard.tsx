import { Heading, HStack, Image, VStack, Text, Icon } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { ChevronRight } from "lucide-react-native";

import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { api } from "@services/api";

type Props = TouchableOpacityProps & {
  data: ExerciseDTO;
}

export function ExerciseCard({ data,  ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="$gray600" alignItems="center" p="$4" pr="$4" mb={10} rounded="$md">
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`
          }}
          alt="Imagem de exercicios biceps"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"

        />
        <VStack flex={1}>
          <Heading color="$white" fontSize="$lg" lineHeight="$sm" fontFamily="sans-serif">
            {data.name}
          </Heading>
          <Text fontSize="$sm" color="$gray200" mt="$1" numberOfLines={4}>{data.series} séries x {data.repetitions} repetições</Text>
        </VStack>
        <Icon as={ChevronRight} color="$gray300" />
      </HStack>

    </TouchableOpacity>
  )
}