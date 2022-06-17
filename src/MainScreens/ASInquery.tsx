import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import AppHeader from "../Custom/AppHeaders";
import moment from "moment";
import I18n from "../../i18n";
import axios from "axios";
import SetAsInquery from "../utils/SetAsInquery";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";
import { DrawerNavigation } from "../../types/NavigationType";
import { AsData, AsDataArr } from "../../types/MainDataTypes";
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

//AS 조회 페이지


function ASInquery({ navigation }: { navigation: DrawerNavigation }) {
  /*
    warning ! moment로 날짜를 문자형식으로 formatting 한후 가 아니면 error발생 Type Error
  */
 /**
  * URL : API_URL
  * startDate : 조회 시작 날짜
  * endDate : 조회 종료 날짜
  * startVisiable : 조회 시작 모달 가시성 boolean type
  * endVisiable : 조회 종료 모달 가시성 boolean type
  * data : 조회한 data
  * renderItem : FlatList에서 렌더링 해줄 Item
  * onLayout : 부모 태그의 가로 크기를 parentWidth에 전달
  * onSearch : as 데이터 조건에 따라 검색해주는 함수
  * 
  *  
  */
  const URL = useSelector((state: reduxState) => state.API.URL);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [startVisiable, setStartVisiable] = useState<boolean>(false);
  const [endVisiable, setEndVisiable] = useState<boolean>(false);
  const [data, setData] = useState<AsDataArr>();
  const renderItem = useCallback(
    ({ item }: { item: AsData }) => (
      <SetAsInquery
        item={item}
        navigation={navigation}
        onLoadData={onLoadData}
      />
    ),
    [data]
  );
  const [parentWidth, setParentWidth] = useState();
  const onLayout = (e: any) => {
    const { width } = e.nativeEvent.layout;
    setParentWidth(width);
  };
  const onSearch = () => {
    axios
      .post(
        URL + "/as/search",
        { startDate, endDate },
        { withCredentials: true }
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  const onLoadData = () => {
    axios
      .post(URL + "/as/inquery", {}, { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("서버와 통신 불가");
      });
  };
  React.useEffect(() => {
    onLoadData();
  }, []);

  const goMain = () => {
    navigation.reset({ routes: [{ name: "home" }] });
  };
  return (
    <>
      <AppHeader
        isLeft={true}
        title={I18n.t("ASInquery")}
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
                      setEndDate(moment(date).format("YYYY-MM-DD"));
                      setEndVisiable(false);
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ width: "20%" }}>
            <TouchableOpacity
              onPress={onSearch}
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
              <Text style={details.font}>
                {I18n.t("Request")}
                {I18n.t("day")}
              </Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t("Title")}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t("RepairDate")}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}></Text>
            </View>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.as_id}></FlatList>
        </View>
      </View>
    </>
  );
}
export default ASInquery;
