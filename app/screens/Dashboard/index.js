import {
  Text,
  Box,
  Button,
  HStack,
  VStack,
  ChevronLeftIcon,
  ChevronRightIcon,
  Spacer,
} from "native-base";
import { Icon, ListItem } from "@rneui/themed";
import { StyleSheet } from "react-native";
import Calendar, { modeToNum } from "react-native-big-calendar";
import dayjs from "dayjs";
import React from "react";

const events = [
  {
    title: "Asset Tagging",
    start: "2022-04-15T08:05:49.292Z",
    end: "2022-04-15T14:08:49.292Z",
  },
];

var styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "white",
    borderRadius: 10,
  },
});

function DashboardScreen(props) {
  const today = new Date();

  const [date, setDate] = React.useState(today);

  const _onPrevDate = () => {
    setDate(
      dayjs(date)
        .add(modeToNum("week", date) * -1, "day")
        .toDate()
    );
  };

  const _onNextDate = () => {
    setDate(dayjs(date).add(modeToNum("week", date), "day").toDate());
  };

  const _onToday = () => {
    setDate(today);
  };

  return (
    <Box padding={5} flex={1}>
      <VStack flex={1} space={5}>
        <Text>Welcome Gokul!</Text>
        <VStack rounded={20} padding={3} bgColor={"#fafbfc"} space={5}>
          <Text>Overview</Text>
          <HStack justifyContent={"center"} space={3}>
            <ListItem containerStyle={styles.listContainer} flex={"1"}>
              <Icon
                reverse
                name="pending-actions"
                type="material"
                color="rgba(255, 182, 72, 0.2)"
                reverseColor="rgba(255, 182, 72,1)'"
              />
              <VStack space={1}>
                <ListItem.Title>100</ListItem.Title>
                <ListItem.Subtitle style={{ color: "grey" }}>
                  Pending
                </ListItem.Subtitle>
              </VStack>
            </ListItem>

            <ListItem containerStyle={styles.listContainer} flex={"1"}>
              <Icon
                reverse
                name="progress-clock"
                type="material-community"
                color="rgba(47, 73, 209, 0.2)"
                reverseColor="rgba(47, 73, 209,1)'"
              />
              <VStack space={1}>
                <ListItem.Title>100</ListItem.Title>
                <ListItem.Subtitle style={{ color: "grey" }}>
                  In Progress
                </ListItem.Subtitle>
              </VStack>
            </ListItem>

            <ListItem containerStyle={styles.listContainer} flex={"1"}>
              <Icon
                reverse
                name="done-all"
                type="material"
                color="rgba(75, 222, 151, 0.2)"
                reverseColor="rgba(75, 222, 151, 1)'"
              />
              <VStack space={1}>
                <ListItem.Title>100</ListItem.Title>
                <ListItem.Subtitle style={{ color: "grey" }}>
                  Completed
                </ListItem.Subtitle>
              </VStack>
            </ListItem>
            <Box justifyContent={"center"}>
              <Button
                rounded={100}
                onPress={() => props.navigation.navigate("Work Orders")}
              >
                Work Orders
              </Button>
            </Box>
          </HStack>
        </VStack>
        <Box padding={3} rounded={15} bgColor={"white"} flex={1}>
          <HStack marginBottom={2} alignItems={"center"} padding={2} space={2}>
            <Button
              colorScheme={"coolGray"}
              leftIcon={<ChevronLeftIcon />}
              variant={"outline"}
              onPress={_onPrevDate}
            />
            <Spacer />
            <Text fontSize={"md"}>{dayjs(date).format("MMMM YYYY")}</Text>
            <Spacer />

            <Button
              colorScheme={"coolGray"}
              leftIcon={<ChevronRightIcon />}
              variant={"outline"}
              onPress={_onNextDate}
            />
          </HStack>

          <Calendar date={date} events={events} height={600} />
        </Box>
      </VStack>
    </Box>
  );
}

export default DashboardScreen;
