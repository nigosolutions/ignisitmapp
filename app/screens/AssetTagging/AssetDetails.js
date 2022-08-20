import {
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  ScrollView,
  SectionList,
  Select,
  Stack,
  Text,
} from "native-base";
import React from "react";

function AssetDetails(props) {
  return (
    <Box padding={5} flex={1}>
      <Box rounded={10} padding={10} bgColor={"white"} flex={1}>
        <HStack space={10} flex={1}>
          <Box flex={2}>
            <Text bold fontSize="xl" mb="4">
              Asset Details
            </Text>
            <ScrollView w="100%">
              <FormControl isRequired>
                <FormControl.Label>Device</FormControl.Label>
                <Select mb={2} placeholder="Select the Device">
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item
                    label="Cross Platform Development"
                    value="cross"
                  />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
                <FormControl.Label>System</FormControl.Label>
                <Select mb={2} placeholder="Select the System">
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item
                    label="Cross Platform Development"
                    value="cross"
                  />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>

                <FormControl.Label>Manufacturer Name</FormControl.Label>
                <Input mb={2} placeholder="Enter the manufacturer ame" />
                <FormControl.Label>Manufacturer P/N</FormControl.Label>
                <Input mb={2} placeholder="Enter the manufacturer P/N" />
                <FormControl.Label>Specification</FormControl.Label>
                <Input mb={2} placeholder="Enter the manufacturer P/N" />
                <FormControl.Label>Drawing No.</FormControl.Label>
                <Input mb={2} placeholder="Enter the manufacturer P/N" />
                <FormControl.Label>Floor No.</FormControl.Label>
                <Input mb={2} placeholder="Enter the manufacturer P/N" />
                <FormControl.Label>Room No.</FormControl.Label>
                <Input mb={2} placeholder="Enter the manufacturer P/N" />
              </FormControl>
            </ScrollView>
            <Button.Group alignSelf={"center"}>
              <Button colorScheme={"coolGray"}>Cancel</Button>
              <Button>Submit</Button>
            </Button.Group>
          </Box>
          <Divider orientation="vertical" />
          <Box borderWidth={2} borderColor={"black"} flex={2}>
            <Text>Hello</Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

export default AssetDetails;
