import { Button as GluestackButton, ButtonText } from "@gluestack-ui/themed";
import { ComponentProps } from "react";


type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <GluestackButton {...rest}>
      <ButtonText>{title}</ButtonText>
    </GluestackButton>
  )
}