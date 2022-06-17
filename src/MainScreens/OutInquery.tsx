import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import AppHeader from "../Custom/AppHeaders";
import moment from "moment";
import I18n from "../../i18n";
import axios from "axios";
import SetOutInquery from "../utils/SetOutInquery";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";
import { DrawerNavigation } from "../../types/NavigationType";
import { OutData, OutDataArr } from "../../types/MainDataTypes";
import CalendarPicker from "react-native-calendar-picker";

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

// 외박 조회 페이지

function OutInquery({ navigation }: { navigation: DrawerNavigation }) {
  /**
   * URL : API_URL
   * startDate : 조회 시작 일자
   * startVisiable : 조회 모달 가시성 boolean
   * data : 조회 데이터
   * update : 강제 렌더링을 위한 변수
   * parentWidth : 부모 component의 가로길이
   * onLayout : 부모 component의 layout을 받아서 width를 parentWidth의 크기로 전달
   * renderItem : Flatlist에서 렌더링 해줄 아이템
   * onSearcch : 검색한 데이터를 다시 data로 전달해주는 함수
   * goMain : 조회에서는 어떤페이지에서 접근을 해도 Main으로 가야되므로 appHeader에 던저주기 위한 함수
   */
  const URL = useSelector((state: reduxState) => state.API.URL);
  const [startDate, setStartDate] = useState<string>();
  /*   const [endDate, setEndDate] = useState<string>(); */
  const [startVisiable, setStartVisiable] = useState<boolean>(false);
  /* const [endVisiable, setEndVisiable] = useState<boolean>(false); */
  const [data, setData] = useState<OutDataArr>();
  const [updated, setUpdated] = useState<number>(0);
  const [parentWidth, setParentWidth] = useState();
  const onLayout = (e: any) => {
    const { width } = e.nativeEvent.layout;
    setParentWidth(width);
  };
  const renderItem = ({ item }: { item: OutData }) => (
    <SetOutInquery item={item} updated={updated} setUpdated={setUpdated} />
  );

  const onSearch = () => {
    axios
      .post(URL + "/stayout/search", { startDate }, { withCredentials: true })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    //페이지 처음 진입시 데이터를 넣어주는 곳
    axios
      .post(URL + "/stayout/inquire", {}, { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("서버와 통신 불가");
      });
  }, [updated]);
  const goMain = (): void => {
    navigation.reset({ routes: [{ name: "home" }] });
  };

  return (
    <>
      <AppHeader
        isLeft={true}
        title={I18n.t("OutRequest")}
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
                <TouchableOpacity
                  onPress={() => setStartVisiable(false)}
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
                      textStyle={{
                        fontFamily: "Cochin",
                        fontSize: 12,
                      }}
                      width={parentWidth}
                      onDateChange={(date) => {
                        setStartDate(date.format("YYYY-MM-DD"));
                        setStartVisiable(false);
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
            {/* <View style={titles.container}>
              <Text>~</Text>
            </View>
            <View style={titles.container}>
              <TouchableOpacity
                style={titles.container}
                onPress={() =>
                  startDate
                    ? setEndVisiable(true)
                    : Alert.alert("시작 일자를 먼저 선택해 주세요.")
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
                    minDate={moment(startDate).toDate()}
                    initialDate={moment(startDate).toDate()}
                    width={parentWidth}
                    onDateChange={(date) => {
                      setEndDate(date.format("YYYY-MM-DD"));
                      setEndVisiable(false);
                    }}
                  />
                </View>
              </View>
            </Modal> */}
          </View>
          <View style={{ width: "20%" }}>
            <TouchableOpacity
              onPress={() => (startDate ? onSearch() : "")}
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
              <Text style={details.font}>{I18n.t("StartDate")}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t("EndDate")}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}></Text>
            </View>
          </View>
          <FlatList
            data={data}
            initialNumToRender={20}
            maxToRenderPerBatch={10}
            windowSize={30}
            renderItem={renderItem}
            keyExtractor={(item) => item.stayout_id}></FlatList>
        </View>
      </View>
    </>
  );
}
export default OutInquery;
