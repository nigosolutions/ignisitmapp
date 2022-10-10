import { FAB, Icon, ListItem, SearchBar } from "@rneui/themed";
import {
  Box,
  Button,
  HStack,
  ScrollView,
  Text,
  VStack,
  Spacer,
  ChevronRightIcon,
  Pressable,
  FlatList,
  Center,
  Spinner,
} from "native-base";
import React from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import axios from "axios";
import { getUser } from "../../auth/auth";

// import { TouchableOpacity } from "react-native-gesture-handler";

var styles = StyleSheet.create({
  title: {
    color: "#4e5d78",
    fontWeight: "bold",
    fontSize: 15,
  },
  desc_title: {
    color: "#4e5d78",
    fontWeight: "bold",
    fontSize: 20,
  },
  subtext: {
    color: "#8a94a6",
    fontWeight: "bold",
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 0,
    paddingTop: 5,
    color: "#8a94a6",
    fontWeight: "bold",
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
  listContainer: {
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
  },
  selectedLC: {
    backgroundColor: "#ebf2ff",
    borderRadius: 10,
  },
  DTitle: {
    color: "black",
    fontWeight: "bold",
    // size: 20
  },
});

function WOScreen(props) {
  const [selectedWo, setselectedWo] = React.useState(0);
  const [pwo, setPWO] = React.useState([]);
  const [cwo, setCWO] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [user,setUser] = React.useState({});

  const WOComponent = (swo) => {
    return (
      <Box flex={1}>
        <SearchBar
          placeholder="Enter Search Text"
          round
          containerStyle={{
            backgroundColor: "white",
            borderBottomColor: "white",
          }}
          inputContainerStyle={{
            backgroundColor: "#f7f7f8",
          }}
          lightTheme
        />

        {loading === true ? (
          <Center flex={1}>
            <Spinner size="lg" />
          </Center>
        ) : (
          <FlatList
            data={swo}
            renderItem={({ item }) => {
              const color =
                item.wo_id === selectedWo.wo_id
                  ? "lightBlue.200"
                  : "blueGray.50";
              return (
                <Pressable
                  onPress={() => {
                    setselectedWo(item);
                  }}
                >
                  <Box
                    backgroundColor={color}
                    borderRadius={10}
                    padding={2}
                    margin={2}
                  >
                    <HStack space={[2, 3]} justifyContent="space-between">
                      <VStack alignItems={"center"}>
                        {item.status === "Pending" ? (
                          <Icon
                            size={40}
                            name="pending"
                            type="material"
                            color="grey"
                          />
                        ) : (
                          <Icon
                            size={40}
                            name="done"
                            type="material"
                            color="grey"
                          />
                        )}
                        <Text fontSize={10}>{item.status}</Text>
                      </VStack>

                      <VStack justifyContent={"center"}>
                        <Text
                          _dark={{
                            color: "warmGray.50",
                          }}
                          style={styles.title}
                        >
                          {item.type}
                        </Text>
                        <Text
                          _dark={{
                            color: "warmGray.200",
                          }}
                          style={styles.subtext}
                        >
                          {item.full_id}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Text
                        fontSize="xs"
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        alignSelf="center"
                      >
                        {new Date(item.date).toDateString()}
                      </Text>
                    </HStack>
                  </Box>
                </Pressable>
              );
            }}
            keyExtractor={(item) => item.wo_id}
          />
        )}
      </Box>
    );
  };

  const getWO = async (stat) => {
    setLoading(true);
    // console.log(user.id);
    await axios
      .get(
        "https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/workorders",
        { params: { status: stat, user_id: 12 } }
      )
      .then((res) => {
        if (stat == "Pending") {
          setPWO(res.data.message);
        } else {
          setCWO(res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(async () => {
    let user = await getUser();
    setUser(user);
    getWO("Completed");
    getWO("Pending");

    // console.log(wo);
  }, []);

  //Tab
  const FirstRoute = () => {
    return WOComponent(pwo);
  };

  const SecondRoute = () => {
    return WOComponent(cwo);
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Pending" },
    { key: "second", title: "Completed" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={"#377dff"}
      indicatorStyle={{ backgroundColor: "#377dff" }}
      inactiveColor={"#8a94a6"}
      style={{ backgroundColor: "white" }}
      labelStyle={{ fontWeight: "bold" }}
    />
  );
  //Tab End

  return (
    <Box padding={3} bgColor={"#E5E5E5"} flex={1}>
      <Box padding={2} rounded={15} bgColor={"white"} flex={1}>
        <HStack flex={1}>
          <Box width={"320"} bgColor={"white"}>
            <VStack flex={1}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
              />
            </VStack>
          </Box>
          <Box bgColor={"white"} flex={1}>
            <VStack space={2} padding={2} flex={1}>
              {selectedWo === 0 ? (
                <Box justifyContent={"center"} alignItems={"center"} flex={1}>
                  <Text color={"#4e5d78"} fontSize={20}>
                    Select a Work Order to View Details
                  </Text>
                </Box>
              ) : (
                <>
                  <HStack bgColor={"blueGray.100"} rounded={10} padding={3}>
                    <VStack space={2}>
                      <Text style={styles.desc_title}>{selectedWo.type}</Text>
                      <Text style={styles.subtext}>
                        WO#: {selectedWo.wo_id}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Box justifyContent={"center"}>
                      <Button
                        rightIcon={<ChevronRightIcon />}
                        colorScheme={"lightBlue"}
                        onPress={() => {
                          // setselectedWo(0);
                          selectedWo.type === "Asset Tagging"
                            ? props.navigation.navigate("AssetTagging", {
                                screen: "ATHome",
                                params: {
                                  WoID: selectedWo.wo_id,
                                  wo: selectedWo,
                                },
                              })
                            : props.navigation.navigate("ITM", {
                                screen: "ITMHome",
                                params: { WoID: selectedWo.wo_id },
                              });
                        }}
                      >
                        {selectedWo.status === "Pending" ? "Continue" : "View"}
                      </Button>
                    </Box>
                  </HStack>

                  <ScrollView padding={3} bgColor={"blueGray.50"} rounded={10}>
                    <HStack>
                      <Box>
                        <Text style={styles.desc_title}>Details:</Text>
                        <Text></Text>
                        <Text>{selectedWo.details}</Text>
                        <Text>{selectedWo.building_name}</Text>
                        <Text></Text>
                        <Text style={styles.desc_title}>Location:</Text>
                        <Text></Text>
                        <Text>{selectedWo.building_area}</Text>
                        <Text></Text>
                      </Box>
                      <Spacer />
                      <Box alignItems={"center"}>
                        <MapView
                          width={200}
                          height={200}
                          region={{
                            latitude: selectedWo.building_loc[0],
                            longitude: selectedWo.building_loc[1],
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }}
                        >
                          <Marker
                            coordinate={{
                              latitude: selectedWo.building_loc[0],
                              longitude: selectedWo.building_loc[1],
                            }}
                            title={selectedWo.building_name}
                            description={selectedWo.building_area}
                          />
                        </MapView>
                      </Box>
                    </HStack>
                  </ScrollView>
                </>
              )}
            </VStack>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

export default WOScreen;
