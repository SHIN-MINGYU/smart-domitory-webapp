import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import AppHeader from "../Custom/AppHeaders";
import I18n from "../../i18n";
import axios from "axios";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";
import { DrawerNavigation } from "../../types/NavigationType";

// 외박 요청 파일

function OutRequest({ navigation }: { navigation: DrawerNavigation }) {
  /**
   * URL : API_URL
   * start_date : 외박 시작 일자
   * end_date : 외박 도착 일자
   * temp : 시작 일자와 도착 일자를 비교해서 교환해주기 위한 변수
   * getDate : 현재 시간
   * onSubmit : 제출시 예외처리와 성공시 제출
   * %%%day : 요일
   */
  const URL = useSelector((state: reduxState) => state.API.URL);
  const [start_date, setStart_date] = useState<string>("");
  const [end_date, setEnd_date] = useState<string>("");
  const [clickCount, setClickCount] = useState<number>(0);
  const [temp, setTemp] = useState<number>();
  const getDATE: Date = new Date();
  const onSubmit = (): void => {
    if (start_date === "" || end_date === "") {
      if (I18n.locale === "ko") {
        alert("시작 혹은 종료 일자를 입력해주세요");
      } else {
        alert("请输入开始或结束日期。");
      }
    } else {
      axios
        .post(
          URL + "/stayout/create",
          { start_date, end_date },
          { withCredentials: true }
        )
        .then(() => navigation.navigate("OutInquery"))
        .catch((err) => console.log(err));
    }
  };
  const NOW: string =
    getDATE.getFullYear() +
    "-0" +
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
  const start: Date = new Date(start_date);
  const end: Date = new Date(end_date);
  const startDay: string = week[start.getDay()] || "";
  const endDay: string = week[end.getDay()] || "";
  return (
    <>
      <AppHeader
        navigation={navigation}
        title={I18n.t("OutRequest")}
        isLeft={true}></AppHeader>
      <View style={{ height: "90%", backgroundColor: "white" }}>
        <Calendar
          minDate={NOW}
          onDayPress={(day: DateData) => {
            if (clickCount == 0) {
              setStart_date(day.dateString);
              setClickCount(clickCount + 1);
              setTemp(day.timestamp);
            } else if (clickCount == 1) {
              setClickCount(clickCount + 1);
              if (temp) {
                if (temp > day.timestamp) {
                  setEnd_date(start_date);
                  setStart_date(day.dateString);
                } else {
                  setEnd_date(day.dateString);
                }
              }
            } else {
              setStart_date(day.dateString);
              setEnd_date("");
              setClickCount(1);
              setTemp(day.timestamp);
            }
          }}
          monthFormat={"yyyy MM"}
          markingType={"period"}
          markedDates={{
            [start_date]: {
              startingDay: true,
              color: "#50cebb",
              textColor: "white",
            },

            [end_date]: {
              endingDay: true,
              color: "#50cebb",
              textColor: "white",
            },
          }}
        />
        <View style={{ marginTop: "5%", height: "10%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              {I18n.t("StartDate")}
              {"  "}
            </Text>
            <TextInput
              style={{
                color: "black",
                width: "80%",
                borderColor: "black",
                borderWidth: 2,
                padding: "1%",
              }}
              value={start_date + " " + startDay}
              editable={false}></TextInput>
          </View>
        </View>
        <View style={{ height: "10%", marginTop: "5%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              {I18n.t("EndDate")}
              {"  "}
            </Text>
            <TextInput
              style={{
                color: "black",
                width: "80%",
                borderColor: "black",
                borderWidth: 2,
                padding: "1%",
              }}
              value={end_date + " " + endDay}
              editable={false}></TextInput>
          </View>
        </View>
        <View
          style={{
            height: "5%",
            alignItems: "center",
            marginTop: "5%",
          }}>
          <TouchableOpacity
            style={{
              width: "95%",
              height: "100%",
              backgroundColor: "#0064ff",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onSubmit}>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              {I18n.t("Request")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default OutRequest;
