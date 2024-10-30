import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

export function HistoryCard() {
  return (
      <HStack w="$full" px="$4" py="$4" mb="$3" bg="$gray600" rounded="$md" alignItems="center" justifyContent="space-between">
        <VStack flex={1} mr="$5">
          <Heading color="$white" fontSize="$md" textTransform="capitalize" fontFamily="$header" numberOfLines={1}>
            Costas
          </Heading>
          
          <Text color="$gray100" fontSize="$lg" numberOfLines={1}>
            Puxada Frontal
          </Text>
        </VStack>

        <Text color="$gray300" fontSize="$md">
          06:32
        </Text>
      </HStack>
    )
}