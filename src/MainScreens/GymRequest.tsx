import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { Calendar } from "react-native-calendars";
import AppHeader from "../Custom/AppHeaders";
import I18n from "../../i18n";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";
import { DrawerNavigation } from "../../types/NavigationType";

// 헴스 예약 페이지

function GymRequest({ navigation }: { navigation: DrawerNavigation }) {
  /**
   * URL : API_URL
   * startVisiable, endVisiable : 시작 시간, 종료 시간 모달의 가시를 지정해주기 위한 변수
   * selectedDate : 고른 날짜
   * startTime, endTime : 시작 시간, 종료 시간을 지정
   * onGymSubmit : 유효성 체크및 제출
   */
  const URL = useSelector((state: reduxState) => state.API.URL);
  const [startVisiable, setStartVisiable] = useState<boolean>(false);
  const [endVisiable, setEndVisiable] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const getDATE: Date = new Date();
  const NOW: string =
    getDATE.getMonth() < 10 || getDATE.getDate() < 10
      ? getDATE.getFullYear() +
        "-0" +
        (getDATE.getMonth() + 1) +
        "-0" +
        getDATE.getDate()
      : getDATE.getFullYear() +
        "-" +
        (getDATE.getMonth() + 1) +
        "-" +
        getDATE.getDate();
  const week = new Array(
    I18n.t("Sunday"),
    I18n.t("Monday"),
    I18n.t("Tuesday"),
    I18n.t("Wednesday"),
    I18n.t("Thursday"),
    I18n.t("Friday"),
    I18n.t("Saturday")
  );
  const getDay: number = new Date(selectedDate).getDay();
  const Day: string = week[getDay] || "";

  const onGymSubmit: () => void = () => {
    if (selectedDate && startTime && endTime) {
      axios
        .post(
          URL + "/hlth/create",
          {
            date: selectedDate,
            start_time: startTime + ":00:00",
            end_time: endTime + ":00:00",
          },
          { withCredentials: true }
        )
        .then((res) => {
          navigation.navigate("GymInquery");
        })
        .catch((err) => console.log(err));
    } else {
      alert("정보를 입력해주세요.");
    }
  };

  // const endTimeArray = [
  //   '',
  //   String(parseInt(startTime) + 1).padStart(2, '0'),
  //   String(parseInt(startTime) + 2).padStart(2, '0'),
  //   '',
  // ];

  return (
    <>
      <AppHeader
        navigation={navigation}
        title={I18n.t("GymRequest")}
        isLeft={true}></AppHeader>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Calendar
          current={NOW}
          minDate={NOW}
          onDayPress={(day) => {
            console.log("selected day", day);
            setSelectedDate(day.dateString);
          }}
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          monthFormat={"yyyy MM"}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
          }}
        />
        <View style={{ marginTop: "10%", height: "10%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              {I18n.t("Date")}{" "}
            </Text>
            <TextInput
              style={{
                color: "black",
                width: "80%",
                borderColor: "black",
                borderWidth: 2,
                padding: "1%",
              }}
              value={selectedDate + " " + Day}
              editable={false}></TextInput>
          </View>
        </View>
        <View style={{ height: "10%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              {I18n.t("Time")}
            </Text>
            <TouchableOpacity
              style={{
                height: "50%",
                width: "30%",
                borderWidth: 1,
                marginLeft: "1%",
              }}
              onPress={() => setStartVisiable(true)}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                  {startTime}시
                </Text>
              </View>
            </TouchableOpacity>
            <Modal
              visible={startVisiable}
              transparent={true}
              animationType="slide">
              <View style={styles.view}>
                <View style={styles.container}>
                  <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={styles.scrollView}>
                    {startTimeArray.map((item: string, index) => (
                      <TouchableOpacity
                        onPress={() => {
                          setStartTime(item);
                          setStartVisiable(false);
                          setEndTime("");
                        }}
                        key={index}>
                        <View style={styles.button}>
                          <Text style={styles.buttonLabel}>{item}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <View
                    pointerEvents={"none"}
                    style={[StyleSheet.absoluteFill, styles.overlay]}>
                    <View style={styles.overlayVisibleView}>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: 12,
                        }}></View>
                      <View style={styles.overlayVisibleViewInner} />
                      <Text
                        style={{
                          display: "flex",
                          marginLeft: "25px",
                          alignItems: "center",
                          fontSize: 15,
                          fontWeight: "bold",
                        }}>
                        시
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={{
                height: "50%",
                width: "19%",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text style={{ fontSize: 40, fontWeight: "bold" }}>~</Text>
            </View>
            <View style={{ height: "50%", width: "30%", borderWidth: 1 }}>
              <TouchableOpacity
                style={{
                  height: "100%",
                  width: "100%",
                }}
                onPress={() => {
                  startTime
                    ? setEndVisiable(true)
                    : alert("시작 시간을 먼저 선택 해 주세요.");
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {endTime}시
                  </Text>
                </View>
              </TouchableOpacity>

              <Modal
                visible={endVisiable}
                transparent={true}
                animationType="slide">
                <View style={styles.view}>
                  <View style={styles.container}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.scrollView}>
                      {endTimeArray
                        .filter((endTA) => {
                          if (endTA === "") return true;
                          return (
                            parseInt(startTime) < parseInt(endTA) &&
                            parseInt(endTA) <= parseInt(startTime) + 2
                          );
                        })
                        .map((item, index) => (
                          <TouchableOpacity
                            onPress={() => {
                              setEndTime(item);
                              setEndVisiable(false);
                            }}
                            key={index}>
                            <View style={styles.button}>
                              <Text style={styles.buttonLabel}>{item}</Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View
                      pointerEvents={"none"}
                      style={[StyleSheet.absoluteFill, styles.overlay]}>
                      <View style={styles.overlayVisibleView}>
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 12,
                          }}></View>
                        <View style={styles.overlayVisibleViewInner} />
                        <Text
                          style={{
                            display: "flex",
                            marginLeft: "25px",
                            alignItems: "center",
                            fontSize: 15,
                            fontWeight: "bold",
                          }}>
                          시
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginTop: "5%" }}>
          <View
            style={{
              width: "88%",
              height: "30%",
            }}>
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#0064ff",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                onGymSubmit();
              }}>
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Text
                  style={{ color: "white", fontWeight: "700", fontSize: 20 }}>
                  {I18n.t("Request")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
const BUTTON_HEIGHT = 50;
const VIEW_HEIGHT = 50 * 3;

const styles = StyleSheet.create({
  scrollView: {
    width: 60,
  },
  container: {
    width: "40%",
    alignSelf: "center",
    flexDirection: "row",
    height: VIEW_HEIGHT,
    backgroundColor: "white",
  },
  view: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
  },
  button: {
    height: BUTTON_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "25px",
  },
  buttonLabel: {
    fontWeight: "bold",
  },
  overlay: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayVisibleView: {
    width: "100%",
    height: BUTTON_HEIGHT,
    flexDirection: "row",
  },
  overlayVisibleViewInner: {
    width: 60,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#c8c8c8",
  },
});
const startTimeArray = [
  "",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "",
];
const endTimeArray = [
  "",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "",
];
export default GymRequest;
