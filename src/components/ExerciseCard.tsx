import { Heading, HStack, Image, VStack, Text, Icon } from "@gluestack-ui/themed"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { ChevronRight } from "lucide-react-native"


type Props = TouchableOpacityProps

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="$gray600" alignItems="center" p="$4" pr="$4" rounded="$md">
        <Image
          source={{
            uri: "https://www.researchgate.net/publication/348435901/figure/fig26/AS:979519313829888@1610547011003/Figura-2-Exemplo-de-um-dos-exercicios-mais-tradicionais-que-tem-como-objetivo-aumentar-a.png"
          }}
          alt="Imagem de exercicios biceps"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"

        />
        <VStack flex={1}>
          <Heading color="$white">
            Biceps Martelo
          </Heading>
          <Text fontSize="$sm" color="$gray200" mt="$1" numberOfLines={2}>3 séries x 12 repetições</Text>
        </VStack>
        <Icon as={ChevronRight} color="$gray300" />
      </HStack>

    </TouchableOpacity>
  )
}