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
  Icon,
  ScrollView,
} from "native-base";
import { useState, useEffect } from "react";
import api from "../../../axiosConfig";
import { setUserSession, getUser } from "../../auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen(props) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let user = getUser();
    console.log("user : ", user);
  }, []);

  const onFinish = () => {
    setLoading(true);
    let { username, password } = formData;
    console.log(formData);

    api
      .post("/auth/login", { userInfo: { username, password } })
      .then(async (res) => {
        setLoading(false);
        console.log(res);
        if (res.status === 200) {
          const user = res.data.message.user;
          const token = res.data.message.token;
          await setUserSession({ user, token });
          props.navigation.navigate("Tab");
          // if (user.first_login) {
          // 	navigate("/resetpassword");
          // } else {
          // 	navigate("/");
          // }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response && err.response.data && err.response.data.message)
          alert(err.response.data.message);
        else alert("Server Error");
      });
  };

  return (
    <Center flex={1} w="100%">
      <Box rounded={10} padding={10} bgColor={"white"} p="2" w="90%" maxW="290">
        <VStack space={3}>
          <Image
            alt="Logo"
            size={200}
            resizeMode="contain"
            source={require("../../assets/logo.png")}
          />
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              onChangeText={(value) =>
                setFormData({ ...formData, username: value })
              }
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={(value) =>
                setFormData({ ...formData, password: value })
              }
            />
          </FormControl>
          <Button colorScheme={"coolGray"} size={"sm"} variant={"link"}>
            Forgot Password?
          </Button>
          <Button
            mt="2"
            colorScheme="lightBlue"
            onPress={onFinish}
            isLoading={loading}
          >
            Sign In
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default LoginScreen;
