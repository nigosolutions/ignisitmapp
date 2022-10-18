import { Box, Center, Text , Button} from "native-base";
import {resetUserSession, get} from "../../auth/auth";

function SettingsScreen(props) {
    return (
        <Box flex={1}>
            <Center flex={1}>

                <Button onPress={() => {
                    resetUserSession();
                    props.navigation.navigate("Login");
                }}>Sign Out</Button>
            </Center>
        </Box>
    );
}

export default SettingsScreen;