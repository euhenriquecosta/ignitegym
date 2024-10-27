import { HomeHeader } from "@components/HomeHeader";
import { VStack, Text } from "@gluestack-ui/themed";


export function Home() {
    return (
        <VStack flex={1}>
            <HomeHeader />
        </VStack>
    )
}