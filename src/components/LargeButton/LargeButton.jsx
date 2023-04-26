import { Text, Box, Button, Image, HStack, Pressable } from "native-base";
import React from "react";

export const LargeButton = ({ children, image, handlePress = () => {} }) => {
  return (
    <Pressable onPress={handlePress} width="100%" bg="green.400" shadow={"none"} rounded="md">
      <Button
        backgroundColor="green.400"
        w="full"
        py="2"
        alignItems="center"
        justifyContent="center"
      >
        <HStack alignItems={"center"} space={2}>
          <Image alt="add" source={image} w={"16px"} h={"16px"} />
          <Text bold fontSize="md" color="gray.600">
            {children}
          </Text>
        </HStack>
      </Button>
    </Pressable>
  );
};
