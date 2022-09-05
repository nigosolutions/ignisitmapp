import {
  Box,
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  HStack,
  Spacer,
  Text,
} from "native-base";
import React from "react";
import Calendar, { modeToNum } from "react-native-big-calendar";
import dayjs from "dayjs";

const events = [
  {
    title: "Asset Tagging",
    start: "2022-04-15T08:05:49.292Z",
    end: "2022-04-15T14:08:49.292Z",
  },
];

function ScheduleScreen(props) {
  const today = new Date();

  const [date, setDate] = React.useState(today);

  const _onPrevDate = () => {
    setDate(
      dayjs(date)
        .add(dayjs(date).date() * -1, "day")
        .toDate()
    );
  };

  const _onNextDate = () => {
    setDate(dayjs(date).add(modeToNum("month", date), "day").toDate());
  };

  const _onToday = () => {
    setDate(today);
  };
  return (
    <Box padding={5} flex={1} bgColor={"white"}>
      <HStack marginBottom={3} alignItems={"center"} padding={1} space={2}>
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
      <Calendar
        showAdjacentMonths
        date={date}
        events={events}
        height={100}
        mode="month"
      />
    </Box>
  );
}

export default ScheduleScreen;
