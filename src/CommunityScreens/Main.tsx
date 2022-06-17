import React, { useCallback, useState, useMemo, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import AppHeader from "../Custom/AppHeaders";
import Icon from "react-native-vector-icons/AntDesign";
import CustomButton from "../Custom/CustomButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SetCommunityItems from "../utils/SetCommunityItems";
import axios from "axios";
import I18n from "../../i18n";
import reduxState from "../../types/reduxStateType";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { CommunityStackNavList } from "../../types/NavigationParamsType";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommunityData } from "../../types/ComunityDataTypes";
type Props = NativeStackScreenProps<CommunityStackNavList, "CommunityDetails">;

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

function Main({ navigation }: { navigation: Props["navigation"] }) {
  //고쳐야함 useRef type
  const listRef = useRef<any>();
  const ITEM_HEIGHT: number = useMemo(() => 50, []);
  const URL: string = useSelector((state: reduxState) => state.API.URL);
  const isLogined: boolean = useSelector(
    (state: reduxState) => state.User.isLogined
  );
  const [data, setData] = useState<CommunityData>();
  const [noticeMode, setNoticeMode] = useState<string>("ALL");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchVisiable, setSearchVisiable] = useState<boolean>(false);
  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [data]
  );
  const renderItem = useCallback(
    ({ item }: { item: CommunityData }) => (
      <SetCommunityItems item={item} navigation={navigation} />
    ),
    []
  );
  const searchData = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0 });
    axios
      .post(URL + "/bulletin/search", { title: searchValue })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [searchValue]);
  const loadUserData = useCallback(
    (mode: string) => {
      if (mode === "HOT") {
        axios
          .post(URL + "/hot/inquire", { CancelToken: source.token })
          .then((res) => {
            console.log(res.data);
            setData(res.data);
          });
      } else {
        axios
          .post(URL + "/bulletin/inquery", { CancelToken: source.token })
          .then((res) => {
            setData(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [noticeMode]
  );
  React.useEffect(() => {
    loadUserData(noticeMode);
    return () => {
      return setData(undefined);
    };
  }, [noticeMode]);

  const noticeModeChanger = (mode: string) => {
    if (mode === "ALL") {
      return (
        <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: "5%" }}>
          {I18n.t("Entire")}
        </Text>
      );
    } /* else if (mode === "공지사항") {
      return (
        <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: "5%" }}>
          {I18n.t("Notice")}
        </Text>
      );
    } */ else if (mode === "HOT") {
      return (
        <View style={{ flexDirection: "row", marginLeft: "3%" }}>
          <MaterialCommunityIcons
            name="fire"
            size={30}></MaterialCommunityIcons>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>HOT</Text>
        </View>
      );
    }
  };
  return (
    <>
      <AppHeader
        navigation={navigation}
        title={I18n.t("AnnonymousCommunity")}
        type={"community"}></AppHeader>

      <View style={{ height: "7%", width: "100%" }}>
        <View
          style={{
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "white",
            borderBottomColor: "#e9e9e9",
            borderBottomWidth: 1,
          }}>
          {noticeModeChanger(noticeMode)}
          {
            //state로 Mode 조정 예정
          }
          <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
            {/*             <TouchableOpacity style={{ marginRight: 10 }}>
              <Icon name="bells" size={30}></Icon>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                if (isLogined) {
                  navigation.navigate({
                    name: "CommunityWrite",
                    params: undefined,
                  });
                } else {
                  alert("로그인 후 이용해주세요");
                }
              }}
              style={{ marginRight: 10 }}>
              <Icon name="edit" size={30}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => setSearchVisiable(!searchVisiable)}>
              <Icon name="search1" size={30}></Icon>
            </TouchableOpacity>
            {searchVisiable ? (
              <TextInput
                style={{
                  backgroundColor: "white",
                  width: "70%",
                  height: 30,
                  padding: 0,
                  paddingLeft: 10,
                  borderRadius: 30,
                  marginRight: "1%",
                }}
                placeholder="제목을 입력해주세요"
                value={searchValue}
                autoFocus={true}
                blurOnSubmit={true}
                onSubmitEditing={searchData}
                onChangeText={(text) => setSearchValue(text)}></TextInput>
            ) : (
              <></>
            )}
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                loadUserData(noticeMode);
                listRef.current?.scrollToOffset({ offset: 0 });
              }}>
              <Icon name="totop" size={30}></Icon>
            </TouchableOpacity>
          </View>
        </View>
        {
          //Title and alarms and search, write
        }
      </View>

      {
        <FlatList
          style={{ backgroundColor: "white" }}
          ref={listRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.bulletin_id}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          maxToRenderPerBatch={7}
          windowSize={10}
          removeClippedSubviews={true}
          getItemLayout={getItemLayout}
          ListHeaderComponent={
            <>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  backgroundColor: "white",
                  alignItems: "center",
                }}>
                <View style={{ marginLeft: "5%" }}>
                  <CustomButton
                    onPress={() => {
                      setNoticeMode("ALL");
                    }}
                    title={I18n.t("Entire")}
                    color="rgba(0,0,0,0)"
                    textColor="black"></CustomButton>
                </View>
                <View style={{ marginLeft: "5%" }}>
                  <CustomButton
                    onPress={() => {
                      setNoticeMode("HOT");
                    }}
                    title="HOT"
                    color="rgba(0,0,0,0)"
                    textColor="black"
                    icon={() => (
                      <MaterialCommunityIcons
                        name="fire"
                        size={15}></MaterialCommunityIcons>
                    )}></CustomButton>
                </View>
                {/*  <View style={{ marginLeft: "5%" }}>
                  <CustomButton
                    onPress={() => {
                      setNoticeMode("공지사항");
                    }}
                    title={I18n.t("Notice")}
                    color="rgba(0,0,0,0)"
                    textColor="black"
                  ></CustomButton>
                </View> */}
              </View>
            </>
          }
        />
      }
      {/*  <View
          style={{
            flexDirection: 'row',
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          }}>
          <View style={{marginLeft: '5%'}}>
            <CustomButton
              title="전체"
              color="rgba(0,0,0,0)"
              textColor="black"></CustomButton>
          </View>
          <View style={{marginLeft: '5%'}}>
            <CustomButton
              title="HOT"
              color="rgba(0,0,0,0)"
              textColor="black"
              icon={() => (
                <MaterialCommunityIcons
                  name="fire"
                  size={15}></MaterialCommunityIcons>
              )}></CustomButton>
          </View>
        </View> */}
    </>
  );
}
export default Main;
