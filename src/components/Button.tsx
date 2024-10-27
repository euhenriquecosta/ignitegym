import { Button as GluestackButton, GluestackUIProvider, Text } from "@gluestack-ui/themed";


type Props = {
    title: string
}

export function Button({ title }: Props) {
    <GluestackButton>
        <Text>{ title }</Text>
    </GluestackButton>
}