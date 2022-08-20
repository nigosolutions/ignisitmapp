import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Text,
  VStack,
} from "native-base";
import React from "react";

function LoginScreen(props) {
  return (
    <Center flex={1} w="100%">
      <Box padding={10} bgColor={"white"} p="2" w="90%" maxW="290">
        <VStack space={3}>
          <Image
            alt="Logo"
            size={200}
            resizeMode="contain"
            source={require("../../assets/logo.png")}
          />
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="blue">
            Sign in
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default LoginScreen;
