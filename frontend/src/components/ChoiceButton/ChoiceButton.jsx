import { Button, VStack, Text, Box } from "@chakra-ui/react";
import { CHOICES } from "../../constants/constants";

const ChoiceButton = ({
  choice,
  onClick,
  isDisabled = false,
  size = "lg",
}) => {

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick(choice);
    }
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      minW={130}
      height="auto"
      p={6}
      bg="white"
      border="2px solid"
      borderColor="gray.200"
      borderRadius="l"
      _hover={{
        bg: !isDisabled ? "gray.200" : "white",
        transform: !isDisabled ? "translateY(-2px)" : "none",
      }}
      _active={{
        transform: !isDisabled ? "translateY(0)" : "none",
      }}
      transition="all 0.2s"
      isDisabled={isDisabled}
    >
      <VStack spacing={2}>
        <Box fontSize="3xl" lineHeight={1}>
          {CHOICES[choice.name] || CHOICES['question']}
        </Box>
        <Text
          fontSize="sm"
          fontWeight="semibold"
          textTransform="capitalize"
          color="gray.700"
        >
          {choice.name}
        </Text>
      </VStack>
    </Button>
  );
};

export default ChoiceButton;
