import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import AppHeader from "../Custom/AppHeaders";
import I18n from "../../i18n";
/* import { Calendar } from "react-native-calendars"; */
import CalendarPicker from "react-native-calendar-picker";
import axios from "axios";
import CheckIcon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import moment from "moment";
import reduxState from "../../types/reduxStateType";
import { DrawerNavigation } from "../../types/NavigationType";
import { DrawerNavList } from "../../types/NavigationParamsType";

//BusRequest 페이지

function BusRequest({
  navigation,
  route,
}: {
  navigation: DrawerNavigation;
  route: DrawerNavList["BusRequest"];
}) {
  //alert 방법좀 찾아야할듯
  /**
   * URL : API_URL
   * dateVisiable : 달력 modal 표시해주기 위한 boolean
   * directionVisiable : 방향 nodal 을 표시해주기위한 boolean
   * busStopVisiable : 버스 정류장 modal을 표시해주기 위한 boolean
   * timeVisiable : 탈 시간 modal을 표시해주기 위한 boolean
   * startDate : 출발 일자
   * direction : 방향
   * selectedBusStop : 탈 버스정류장
   * time : 탈 시간
   * availableBusStop : 선택한 날짜과 방향에서 탈수있는 버스정류장
   * availableTime : 선택한 날짜와 방향과 버스정류장에서 탈수 있는 시간
   * onLayout : 부모태그 크기를 parentWidth 와 parentHeight에 저장해주기 위한 함수
   *
   */
  const URL = useSelector((state: reduxState) => state.API.URL);
  const [dateVisiable, setdateVisiable] = useState<boolean>(false);
  const [directionVisiable, setDirectionVisiable] = useState<boolean>(false);
  const [busStopVisiable, setBusStopVisiable] = useState<boolean>(false);
  const [timeVisiable, setTimeVisiable] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [direction, setDirection] = useState<number>();
  const [selectedBusStop, setSelectedBusStop] = useState<string>();
  const [time, setTime] = useState<string>();
  const [availableBusStop, setAvailableBusStop] = useState();
  const [availableTime, setAvailableTime] = useState();
  const [parentWidth, setParentWidth] = useState();
  const [parentHeight, setParentHeight] = useState();
  React.useEffect(() => {
    //날짜와 방향을 조회해 탈수있는 버스정류장을 받아옴
    axios.post(URL + "/businfo").then((res) => {});
    if (direction || direction == 0) {
      axios
        .post(URL + "/businfo/availableBusStop", {
          type: direction,
          bus_date,
        })
        .then((res) => setAvailableBusStop(res.data))
        .catch((err) => console.error(err));
    }
  }, [direction]);
  React.useEffect(() => {
    // 버스정류장이 선택되면 탈 수 있는 시간을 정해줌
    if (selectedBusStop) {
      axios
        .post(URL + "/businfo/availableTime", {
          type: direction,
          bus_date,
          bus_stop: selectedBusStop,
        })
        .then((res) => setAvailableTime(res.data));
    }
  }, [selectedBusStop]);
  React.useEffect(() => {
    //만약 route에 params가 들어가 있다면 수정 하는 상황이므로 원래 정보들을 담아줌
    if (route) {
      if (route.params) {
        setStartDate(moment(route.params.item.bus_date).format("YYYY-MM-DD"));
        setDirection(route.params.item.bus_way);
        setSelectedBusStop(route.params.item.bus_stop);
        setTime(route.params.item.bus_time);
      }
    }
  }, []);
  const onLayout = (e: any) => {
    const { width } = e.nativeEvent.layout;
    const { height } = e.nativeEvent.layout;
    setParentWidth(width);
    setParentHeight(height);
  };
  const directionArr = [
    "복현캠퍼스 > 글로벌캠퍼스",
    "글로벌캠퍼스 > 복현캠퍼스",
  ];
  const now = new Date();
  now.setDate(now.getDate() + 3);
  const getDay = new Date(startDate).getDay();
  const bus_date = getDay == 0 || getDay == 6 ? 1 : 0;
  const onBusReq = () => {
    /**
     * 수정과 생성을 구분해서 제출해주기 위해 만든 함수
     */
    if (route) {
      if (route.params) {
        axios
          .patch(
            URL + "/bus/update",
            {
              bus_date: startDate,
              bus_way: direction,
              bus_stop: selectedBusStop,
              bus_time: time,
              bus_req_id: route.params.item.bus_req_id,
            },
            { withCredentials: true }
          )
          .then((res) => {
            navigation.navigate("BusInquery");
          })
          .catch((err) => console.error(err));
      } else {
        axios
          .post(
            URL + "/bus/create",
            {
              bus_date: startDate,
              bus_way: direction,
              bus_stop: selectedBusStop,
              bus_time: time,
            },
            { withCredentials: true }
          )
          .then((res) => {
            navigation.navigate("BusInquery");
          })
          .catch((err) => console.error(err));
      }
    }
  };
  return (
    <>
      <AppHeader
        navigation={navigation}
        title={I18n.t("BusRequest")}
        isLeft={true}></AppHeader>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 2,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}>
                {I18n.t("Date")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setdateVisiable(true);
                setSelectedBusStop("");
                setTime("");
              }}
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {startDate}
              </Text>
            </TouchableOpacity>
            <Modal visible={dateVisiable} transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <View
                  style={{
                    height: "40%",
                    width: "70%",
                    backgroundColor: "white",
                  }}
                  onLayout={onLayout}>
                  <CalendarPicker
                    minDate={now}
                    initialDate={now}
                    width={parentWidth}
                    height={parentHeight}
                    onDateChange={(date: any) => {
                      setStartDate(date.format("YYYY-MM-DD"));
                      setdateVisiable(false);
                    }}></CalendarPicker>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 2,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}>
                {I18n.t("Direction")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setDirectionVisiable(true)}
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {direction == 0 || direction ? directionArr[direction] : ""}
              </Text>
            </TouchableOpacity>
            <Modal visible={directionVisiable} transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <View
                  style={{
                    height: "30%",
                    width: "60%",
                    backgroundColor: "white",
                  }}>
                  <View style={{ flex: 0.7, justifyContent: "center" }}>
                    <Text
                      style={{
                        marginLeft: "10%",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}>
                      {I18n.t("Direction")}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setDirectionVisiable(false);
                      setDirection(0);
                      setSelectedBusStop("");
                      setTime("");
                    }}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <View
                      style={{
                        marginLeft: "10%",
                      }}>
                      {direction === 0 ? (
                        <CheckIcon
                          name={"circle"}
                          size={18}
                          color={"#0064ff"}></CheckIcon>
                      ) : (
                        <CheckIcon
                          name={"circle-thin"}
                          size={18}
                          color={"gray"}></CheckIcon>
                      )}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: "10%",
                        justifyContent: "center",
                      }}>
                      <Text style={{ fontSize: 12 }}>{directionArr[0]}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDirectionVisiable(false);
                      setDirection(1);
                      setSelectedBusStop("");
                      setTime("");
                    }}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <View
                      style={{
                        marginLeft: "10%",
                      }}>
                      {direction === 1 ? (
                        <CheckIcon
                          name={"circle"}
                          size={18}
                          color={"#0064ff"}></CheckIcon>
                      ) : (
                        <CheckIcon
                          name={"circle-thin"}
                          size={18}
                          color={"gray"}></CheckIcon>
                      )}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        marginLeft: "10%",
                      }}>
                      <Text style={{ fontSize: 12 }}>{directionArr[1]}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 2,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}>
                {I18n.t("BusStop")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                startDate && (direction || direction === 0)
                  ? setBusStopVisiable(true)
                  : alert("출발일자와 방면을 설정하지 않았습니다.");
                setTime(undefined);
              }}
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {selectedBusStop}
              </Text>
            </TouchableOpacity>
            <Modal visible={busStopVisiable} transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <View
                  style={{
                    width: "70%",
                    height: "40%",
                    backgroundColor: "white",
                  }}>
                  <View
                    style={{
                      width: "100%",
                      height: "20%",
                      borderBottomColor: "#e9e9e9",
                      borderBottomWidth: 1,
                      justifyContent: "center",
                    }}>
                    <Text
                      style={{
                        marginLeft: "10%",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}>
                      {I18n.t("BusStop")}
                    </Text>
                  </View>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={availableBusStop}
                    keyExtractor={(item) => (item ? item.bus_id : "")}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setBusStopVisiable(false);
                          setSelectedBusStop(item.bus_stop);
                        }}
                        style={{
                          borderTopWidth: 1,
                          borderColor: "navy",
                          flexDirection: "row",
                          padding: 10,
                          backgroundColor: "white",
                        }}>
                        {selectedBusStop === item.bus_stop ? (
                          <CheckIcon
                            name={"circle"}
                            size={18}
                            color={"#0064ff"}></CheckIcon>
                        ) : (
                          <CheckIcon
                            name={"circle-thin"}
                            size={18}
                            color={"#0064ff"}></CheckIcon>
                        )}
                        <Text style={{ marginLeft: "10%" }}>
                          {item.bus_stop}
                        </Text>
                      </TouchableOpacity>
                    )}></FlatList>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 2,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}>
                {I18n.t("Time")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                (startDate && (direction || direction === 0)) || selectedBusStop
                  ? setTimeVisiable(true)
                  : alert("시작일자와 방면, 버스정류장을 선택하지 않았습니다.")
              }
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>{time}</Text>
            </TouchableOpacity>
            <Modal visible={timeVisiable} transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <View
                  style={{
                    width: "70%",
                    height: "40%",
                    backgroundColor: "white",
                  }}>
                  <View
                    style={{
                      height: "20%",
                      width: "100%",
                      borderBottomColor: "#e9e9e9",
                      borderBottomWidth: 1,
                      justifyContent: "center",
                    }}>
                    <Text
                      style={{
                        marginLeft: "10%",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}>
                      {I18n.t("Time")}
                    </Text>
                  </View>
                  <FlatList
                    data={availableTime}
                    keyExtractor={(item) => item.bus_id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setTime(item.bus_time);
                          setTimeVisiable(false);
                        }}
                        style={{
                          borderTopWidth: 1,
                          borderColor: "navy",
                          flexDirection: "row",
                          padding: 10,
                          backgroundColor: "white",
                        }}>
                        {time === item.bus_time ? (
                          <CheckIcon
                            name={"circle"}
                            size={18}
                            color={"#0064ff"}></CheckIcon>
                        ) : (
                          <CheckIcon
                            name={"circle-thin"}
                            size={18}
                            color={"#0064ff"}></CheckIcon>
                        )}
                        <Text style={{ marginLeft: "10%" }}>
                          {item.bus_time}
                        </Text>
                      </TouchableOpacity>
                    )}></FlatList>
                </View>
              </View>
            </Modal>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <TouchableOpacity
              onPress={onBusReq}
              style={{
                width: "70%",
                height: "50%",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}>
                {I18n.t("Request")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default BusRequest;
