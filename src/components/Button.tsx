import { Button as GluestackButton, ButtonText, ButtonSpinner } from "@gluestack-ui/themed";
import { ComponentProps } from "react";


type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  variant?: "solid" | "outline"
  isLoading?: boolean
}

export function Button({ title, variant = "solid", isLoading = false, ...rest }: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$14"
      bg={variant === "outline" ? "transparent" : "$green700"}
      borderWidth={variant === "outline" ? "$1" : 0}
      borderColor="$green500"
      rounded="$sm"
      $active-backgroundColor={variant === "outline" ? "$gray600" : "$green700"}
      disabled={isLoading}
      {...rest}
    >
      {
        isLoading ? <ButtonSpinner color="$white" /> :

          <ButtonText
            color={variant === "outline" ? "$green500" : "$white"}
            fontFamily="$heading"
            fontSize="$sm"
          >
            {title}
          </ButtonText>
      }

    </GluestackButton>
  )
}