import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import AppHeader from "../Custom/AppHeaders";
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";

import I18n from "../../i18n";
import axios from "axios";
import SetHlthItem from "../utils/SetHlthItem";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";
import { DrawerNavigation } from "../../types/NavigationType";
import { HlthData } from "../../types/MainDataTypes";
function GymInquery({ navigation }: { navigation: DrawerNavigation }) {
  /*
    @params startDate  : 시작 날짜의 value
    @params endDate    : 끝 날짜의 value
    warning ! moment로 날짜를 문자형식으로 formatting 한후 가 아니면 error발생 Type Error
  */

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startVisiable, setStartVisiable] = useState<boolean>(false);
  const [endVisiable, setEndVisiable] = useState<boolean>(false);
  const [data, setData] = useState();
  const [parentWidth, setParentWidth] = useState();
  const URL = useSelector((state: reduxState) => state.API.URL);
  const renderItem = ({ item }: { item: HlthData }) => (
    <SetHlthItem item={item} loadData={loadData}></SetHlthItem>
  );
  const onLayout = (e: any) => {
    const { width } = e.nativeEvent.layout;
    setParentWidth(width);
  };
  const loadData = () => {
    //** */
    axios
      .post(URL + "/hlth/inquire", {}, { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("서버와 통신 불가");
      });
  };
  const searchData = () => {
    axios
      .post(
        URL + "/hlth/search",
        { startDate, endDate },
        { withCredentials: true }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("서버와 통신 불가");
      });
  };
  React.useEffect(() => {
    loadData();
  }, []);
  const goMain = (): void => {
    navigation.reset({ routes: [{ name: "home" }] });
  };
  return (
    <>
      <AppHeader
        isLeft={true}
        title={I18n.t("GymInquery")}
        navigation={navigation}
        goMain={goMain}></AppHeader>
      <View
        style={{
          height: "90%",
          alignItems: "center",
          backgroundColor: "white",
        }}>
        <View
          style={{
            width: "90%",
            height: "10%",
            borderWidth: 1,
            marginTop: "5%",
            borderRadius: 15,
            flexDirection: "row",
          }}>
          <View
            style={{
              width: "80%",
              flexDirection: "column",
            }}>
            <View style={titles.container}>
              <TouchableOpacity
                style={titles.container}
                onPress={() => setStartVisiable(true)}>
                <View style={{ width: "100%" }}>
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    {startDate
                      ? moment(startDate).format(
                          "          YYYY" +
                            I18n.t("year") +
                            "          MM" +
                            I18n.t("month") +
                            "          DD" +
                            I18n.t("day")
                        )
                      : "          " +
                        I18n.t("year") +
                        "          " +
                        I18n.t("month") +
                        "          " +
                        I18n.t("day")}
                  </Text>
                </View>
              </TouchableOpacity>
              <Modal visible={startVisiable} transparent={true}>
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
                      /*                       minDate={new Date()} */
                      width={parentWidth}
                      onDateChange={(date) => {
                        setStartDate(date.format("YYYY-MM-DD"));
                        setStartVisiable(false);
                        setEndDate("");
                      }}
                    />
                  </View>
                </View>
              </Modal>
            </View>
            <View style={titles.container}>
              <Text>~</Text>
            </View>
            <View style={titles.container}>
              <TouchableOpacity
                style={titles.container}
                onPress={() =>
                  startDate
                    ? setEndVisiable(true)
                    : alert("시작 일자를 먼저 선택해 주세요.")
                }>
                <View style={{ width: "100%" }}>
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    {endDate
                      ? moment(endDate).format(
                          "          YYYY" +
                            I18n.t("year") +
                            "          MM" +
                            I18n.t("month") +
                            "          DD" +
                            I18n.t("day")
                        )
                      : "          " +
                        I18n.t("year") +
                        "          " +
                        I18n.t("month") +
                        "          " +
                        I18n.t("day")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Modal visible={endVisiable} transparent={true}>
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
                  }}>
                  <CalendarPicker
                    width={parentWidth}
                    initialDate={moment(startDate).toDate()}
                    minDate={moment(startDate).toDate()}
                    onDateChange={(date) => {
                      setEndDate(date.format("YYYY-MM-DD"));
                      setEndVisiable(false);
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ width: "20%" }}>
            <TouchableOpacity
              onPress={searchData}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0)",
                justifyContent: "center",
                alignContent: "center",
              }}>
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
                {I18n.t("Inquery")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "90%",
            height: "80%",
            borderWidth: 1,
            marginTop: "1%",
            borderRadius: 15,
          }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: "5%",
              marginBottom: "5%",
            }}>
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t("Date")}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t("Time")}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}></Text>
            </View>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.hlth_id}
            renderItem={renderItem}></FlatList>
        </View>
      </View>
    </>
  );
}
const titles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
const details = StyleSheet.create({
  innerbox: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  font: {
    fontWeight: "bold",
    color: "black",
  },
});
const getDATE = new Date();
const NOW =
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
export default GymInquery;
