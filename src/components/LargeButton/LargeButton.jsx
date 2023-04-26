import { Text, Box, Button, Image, HStack } from "native-base";
import React from "react";

export const LargeButton = ({ children, image }) => {
  return (
    <Box width="100%" bg="green.400" shadow={2} rounded="md">
      <Button
        backgroundColor="green.400"
        w="full"
        py="2"
        alignItems="center"
        justifyContent="center"
      >
        <HStack>
          <Image alt="add" source={image} mr="6" />
          <Text bold fontSize="md" color="gray.600">
            {children}
          </Text>
        </HStack>
      </Button>
    </Box>
  );
};
