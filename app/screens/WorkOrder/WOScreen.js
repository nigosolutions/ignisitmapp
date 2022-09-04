import { FAB, Icon, ListItem, SearchBar } from "@rneui/themed";
import {
  Box,
  Button,
  Heading,
  HStack,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import React from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
// import { Marker } from "react-native-svg";

var styles = StyleSheet.create({
  title: {
    color: "#4e5d78",
    fontWeight: "bold",
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
  const [status, setStatus] = React.useState(0);
  const [selectedWo, setselectedWo] = React.useState(0);
  const [wo, setWO] = React.useState([]);
  React.useEffect(() => {
    setWO([
      {
        name: "Asset tagging",
        id: "AT3224",
        details: "Details of Asset tagging",
        date: "10 Jan",
        building: {
          name: "Building 1",
          location: { address: "XYZ street", coords: [25.2854, 51.531] },
        },
        status: "pending",
      },
      {
        name: "Asset tagging",
        id: 2,
        details: "Details of Asset tagging",
        date: "11 Jan",
        building: {
          name: "Building 2",
          location: { address: "XYZ street", coords: [25, 55] },
        },
        status: "pending",
      },
      {
        name: "Asset tagging",
        id: 3,
        details: "Details of Asset tagging",
        date: "12 Jan",
        building: {
          name: "Building 3",
          location: { address: "XYZ street", coords: [24.9909, 51.5493] },
        },
        status: "pending",
      },
      {
        name: "Asset tagging",
        id: 3,
        details: "Details of Asset tagging",
        date: "12 Jan",
        building: {
          name: "Building 3",
          location: { address: "XYZ street", coords: [25.1659, 51.5976] },
        },
        status: "pending",
      },
      {
        name: "Asset tagging",
        id: 3,
        details: "Details of Asset tagging",
        date: "12 Jan",
        building: {
          name: "Building 3",
          location: { address: "XYZ street", coords: [25.1659, 51.5976] },
        },
        status: "completed",
      },
    ]);
  }, []);

  React.useEffect(() => {}, [selectedWo]);

  //Tab
  const FirstRoute = () => (
    <Box>
      <SearchBar
        placeholder="Enter Search Text"
        round
        containerStyle={{ backgroundColor: "white" }}
        inputContainerStyle={{ backgroundColor: "#e5e5e5" }}
        lightTheme
      />

      <ScrollView>
        <VStack space={3} padding={3}>
          {wo.map((item) =>
            item.status != "completed" ? (
              <ListItem
                containerStyle={
                  item === selectedWo ? styles.selectedLC : styles.listContainer
                }
                onPress={() => {
                  setselectedWo(item);
                }}
              >
                <VStack alignItems={"center"}>
                  <Icon size={40} name="pending" type="material" color="grey" />
                  <Text fontSize={10}>Pending</Text>
                </VStack>
                <ListItem.Content>
                  <ListItem.Title style={styles.title}>
                    {item.name}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.subtitleView}>
                    {"WO: "}
                    {item.id}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Text>{item.date}</Text>
              </ListItem>
            ) : null
          )}
        </VStack>
      </ScrollView>
    </Box>
  );

  const SecondRoute = () => (
    <Box>
      <SearchBar
        placeholder="Enter Search Text"
        round
        containerStyle={{ backgroundColor: "white" }}
        inputContainerStyle={{ backgroundColor: "#e5e5e5" }}
        lightTheme
      />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: item.avatarUrl,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.fullName}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.recentText}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.timeStamp}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* <ScrollView>
        <VStack space={3} padding={3}>
          {wo.map((item) =>
            item.status == "completed" ? (
              <ListItem
                containerStyle={
                  item === selectedWo ? styles.selectedLC : styles.listContainer
                }
                onPress={() => {
                  setselectedWo(item);
                }}
              >
                <VStack alignItems={"center"}>
                  <Icon size={40} name="pending" type="material" color="grey" />
                  <Text fontSize={10}>Completed</Text>
                </VStack>
                <ListItem.Content>
                  <ListItem.Title style={styles.title}>
                    {item.name}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.subtitleView}>
                    {"WO: "}
                    {item.id}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Text>{item.date}</Text>
              </ListItem>
            ) : null
          )}
        </VStack>
      </ScrollView> */}
    </Box>
  );

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
      activeColor={"#4e5d78"}
      indicatorStyle={{ backgroundColor: "#FF7D00" }}
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
          <Box
            bgColor={"white"}
            flex={1}
            borderRightWidth={1}
            borderColor={"#e5e5e5"}
          >
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
          <Box bgColor={"white"} flex={2}>
            <VStack space={2} padding={2} flex={1}>
              {selectedWo === 0 ? (
                <Box justifyContent={"center"} alignItems={"center"} flex={1}>
                  <Text color={"#4e5d78"} fontSize={20}>
                    Select a Work Order to View Details
                  </Text>
                </Box>
              ) : (
                <>
                  <VStack borderBottomWidth={1} borderColor={"#e5e5e5"}>
                    <Text style={styles.desc_title}>{selectedWo.name}</Text>
                    <Text style={styles.subtext}>WO#: {selectedWo.id}</Text>
                  </VStack>
                  <ScrollView>
                    <Text style={styles.desc_title}>Details:</Text>
                    <Text></Text>
                    <Text>{selectedWo.details}</Text>
                    <Text>{selectedWo.building.name}</Text>
                    <Text></Text>
                    <Text style={styles.desc_title}>Location:</Text>
                    <Text></Text>
                    <Text>{selectedWo.building.location.address}</Text>
                    <Text></Text>
                    <Box flex={1} alignItems={"center"}>
                      <MapView
                        width={"75%"}
                        height={300}
                        region={{
                          latitude: selectedWo.building.location.coords[0],
                          longitude: selectedWo.building.location.coords[1],
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                      >
                        <Marker
                          coordinate={{
                            latitude: selectedWo.building.location.coords[0],
                            longitude: selectedWo.building.location.coords[1],
                          }}
                          title={selectedWo.building.name}
                          description={selectedWo.building.location.address}
                        />
                      </MapView>
                    </Box>
                  </ScrollView>
                  <Box
                    alignItems={"center"}
                    borderTopColor={"#e5e5e5"}
                    borderTopWidth={"1"}
                    paddingTop={3}
                  >
                    <FAB
                      title={
                        selectedWo.status === "pending" ? "Continue" : "View"
                      }
                      color="#377DFF"
                      onPress={() => {
                        // setselectedWo(0);
                        props.navigation.navigate("AssetTagging");
                      }}
                    />
                  </Box>
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
