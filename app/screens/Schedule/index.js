import {
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  ChevronRightIcon,
  HStack,
  Spacer,
  Spinner,
  Text,
} from "native-base";
import React from "react";
import Calendar, { modeToNum } from "react-native-big-calendar";
import dayjs from "dayjs";
import axios from "axios";
import { getUser } from "../../auth/auth";

function ScheduleScreen(props) {
  const [schedule, setSchedule] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  React.useEffect(async () => {
    getSchedule();
  }, []);
  const getSchedule = async () => {
    setLoading(true);
    let user = await getUser();

    setUser(user);
    await axios({
      method: "get",
      url: `https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/schedule?id=${user.id}`,
    })
      .then((res) => {
        setLoading(false);
        console.log(res.data.message);
        let schedule = res.data.message.map((item) => ({
          title: item.activity,
          start: new Date(item.start),
          end: new Date(item.end),
          wo_id: item.wo_id,
        }));
        console.log(schedule);
        setSchedule(schedule);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  return loading === true ? (
    <Center flex={1}>
      <Spinner size={"lg"} />
    </Center>
  ) : (
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
        onPressEvent={(item) => props.navigation.navigate("Work Orders")}
        swipeEnabled={false}
        showAdjacentMonths
        date={date}
        events={schedule}
        height={100}
        mode="month"
      />
    </Box>
  );
}

export default ScheduleScreen;
