import { NativeBaseProvider, Box, AspectRatio, Center, Stack, HStack, Heading, Text, Image } from "native-base";
import { useEffect, useRef } from "react";

export const CTACard = ({image, title, content}) => {

    const myRef = useRef({});
    useEffect(() => {
        const styleObj = {
            shadowColor: '#000000',
            shadowOffset: {
                width: 4,
                height: 4
            },
            shadowOpacity: .15,
            shadowRadius: 15
        };
        myRef.current.setNativeProps({
            style: styleObj
        });
    }, [myRef]);
  
    return (
        <Box alignItems="center" borderWidth={0}  borderRadius={12} bg="white" mt={24} ref={myRef}>
            { image && <Image mb={"-6"} mt={"-20"} source={image} alt="test" w={149} h={149} /> }
            <Stack space={3} p={8}>
                {title && <Heading textAlign={"center"} color={"gray.600"} size="md">{title}</Heading>}
                {content && <Text fontSize="sm" color={"gray.600"} textAlign={"center"}>{content}</Text>}
            </Stack>
        </Box>
    );
};