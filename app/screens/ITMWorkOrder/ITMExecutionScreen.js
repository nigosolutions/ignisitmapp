import React from 'react';
import { Box, Text, HStack, VStack } from "native-base";
import { FAB } from '@rneui/base';

function ITMExecutionScreen(props) {
    return (
        <Box flex={1} padding={5}>
            <Box rounded={10} flex={1} justifyContent={'center'} alignItems={'center'} bgColor={'white'}>
                <Text>Verify device to proceed!!!.</Text>
                <FAB color='#4e5d78' bgColor='#4e5d78'title={'Click to Verify'}/>
            </Box>

        </Box>
  
    );
}

export default ITMExecutionScreen;