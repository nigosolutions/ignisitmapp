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
} from "native-base";
import { useState, useEffect } from "react";
import api from "../../../axiosConfig";
import { setUserSession, getUser } from "../../auth/auth";

function LoginScreen(props) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let user = getUser();
    console.log("user : ", user);
  }, []);

  const onFinish = () => {
    setLoading(true);
    let { email, password } = formData;
    console.log(formData);

    api
      .post("/auth/login", { userInfo: { email, password } })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.status === 200) {
          const user = res.data.message.user;
          const token = res.data.message.token;
          setUserSession({ user, token });
          props.navigation.navigate("Drawer");
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
            <Input
              onChangeText={(value) =>
                setFormData({ ...formData, email: value })
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
          <Button
            mt="2"
            colorScheme="blue"
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
