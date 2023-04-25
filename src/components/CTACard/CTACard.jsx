import { NativeBaseProvider, Box, AspectRatio, Center, Stack, HStack, Heading, Text, Image } from "native-base";

export const CTACard = ({image, title, content}) => {
  return (
    <Box alignItems="center"  shadow={5} borderRadius={16} bg="white">
        <Image mb={"-6"} mt={"-20"} source={image} alt="test" w={149} h={149} />
        <Stack space={3} p={8}>
            <Heading textAlign={"center"} size="md">{title}</Heading>
            <Text textAlign={"center"}>{content}</Text>
        </Stack>
    </Box>
  );
};
