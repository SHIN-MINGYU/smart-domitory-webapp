import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import AppHeader from "../Custom/AppHeaders";
import Comment from "./Comment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import I18n from "../../i18n";
import axios from "axios";
import { Buffer } from "buffer";
import { useSelector } from "react-redux";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommunityStackNavList } from "../../types/NavigationParamsType";
import reduxState from "../../types/reduxStateType";
import { CommentData, ImageData } from "../../types/ComunityDataTypes";
type Props = NativeStackScreenProps<CommunityStackNavList, "CommunityDetails">;

type comment = {
  item: {
    bulletin_id: string;
    comment_id: string;
    content: string;
    create_date: string;
    std_id: string;
  };
};

function Details({
  navigation,
  route,
}: {
  navigation: Props["navigation"];
  route: Props["route"];
}) {
  const URL = useSelector((state: reduxState) => state.API.URL);
  const std_id = useSelector((state: reduxState) => state.User.info.std_id);
  const [commentValue, setCommentValue] = useState<string | null>();
  const [isSame, setIsSame] = useState<boolean>(false);
  const [commentData, setCommentData] = useState<
    Array<CommentData> | undefined
  >(undefined);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [images, setImages] = useState([]);
  const [hot, setHot] = useState<number>(route.params.item.hot);
  const renderItem = useCallback(({ item }: comment) => {
    return (
      <Comment
        item={item}
        setCommentData={setCommentData}
        setCommentCount={setCommentCount}
      />
    );
  }, []);
  React.useEffect(() => {
    axios
      .post(URL + "/comment/inquery", {
        bulletin_id: route.params.item.bulletin_id,
      })
      .then((res) => {
        setCommentData(res.data.rows);
        setCommentCount(res.data.count);
      })
      .catch((err) => console.log(err));
    axios
      .post(URL + "/bulletin/image/inquire", {
        bulletin_id: route.params.item.bulletin_id,
      })
      .then((res) => setImages(res.data));
    if (std_id === route.params.item.std_id) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
    () => {
      setCommentCount(0);
      setCommentData(undefined);
    };
  }, []);
  const onSubmitComment = useCallback(() => {
    axios
      .post(
        URL + "/comment/create",
        {
          content: commentValue,
          bulletin_id: route.params.item.bulletin_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setCommentValue(null);
        axios
          .post(URL + "/comment/inquery", {
            bulletin_id: route.params.item.bulletin_id,
          })
          .then((res) => {
            setCommentData(res.data.rows);
            setCommentCount(res.data.count);
          });
      })
      .catch((err) => console.log(err));
  }, [commentValue]);
  const deleteItem = async () => {
    axios
      .delete(URL + "/bulletin/delete", {
        data: {
          bulletin_id: route.params.item.bulletin_id,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.error(err);
        console.trace(err);
      });
    navigation.reset({ index: 0, routes: [{ name: "CommunityMain" }] });
  };
  const clickHot = () => {
    axios
      .post(
        URL + "/bulletin/clickHot",
        { id: route.params.item.bulletin_id },
        { withCredentials: true }
      )
      .then((res) =>
        typeof res.data === "string" ? alert(res.data) : setHot(res.data.hot)
      )
      .catch((err) => console.trace(err));
  };
  return (
    <>
      <AppHeader
        title={I18n.t("AnnonymousCommunity")}
        isLeft={true}
        navigation={navigation}></AppHeader>
      <View style={{ flex: 1 }}>
        <FlatList
          data={commentData}
          renderItem={renderItem}
          keyExtractor={(item) => item.comment_id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
              }}>
              <View
                style={{
                  marginBottom: "5%",
                  paddingLeft: "3%",
                  padding: 5,
                  borderBottomWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "400",
                      marginRight: 10,
                      color: "black",
                      marginBottom: "2%",
                    }}>
                    {route.params.item.title}
                  </Text>
                  {isSame ? (
                    <View style={{ flexDirection: "row", marginRight: "5%" }}>
                      <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={() => {
                          deleteItem();
                        }}>
                        <Text>{I18n.t("Delete")}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("CommunityUpdate", {
                            item: route.params.item,
                            images: images,
                          });
                        }}>
                        <Text>{I18n.t("Update")}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginRight: 10 }}>
                    ID : {route.params.id}
                  </Text>
                  <Text style={{ marginRight: 10 }}>
                    {I18n.t("Views")} : {route.params.item.views}
                  </Text>
                  <Text style={{ marginRight: 10 }}>
                    {I18n.t("Hot")} : {hot}
                  </Text>
                  <Text>
                    {I18n.t("CreateDetail")}
                    {I18n.t("day")} :
                    {moment(route.params.item.create_date).format("YYYY-MM-DD")}{" "}
                  </Text>
                </View>
              </View>
              <View>
                <View style={{ alignItems: "center" }}>
                  {images ? (
                    images.map((image: ImageData, index) => {
                      return (
                        <Image
                          key={index}
                          style={{
                            width: 350,
                            height: 350,
                            resizeMode: "contain",
                            marginBottom: "1%",
                          }}
                          source={{
                            uri: Buffer.from(image.path).toString(),
                          }}></Image>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </View>
                <Text style={{ marginLeft: 10 }}>
                  {route.params.item.content}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                }}>
                <TouchableOpacity
                  onPress={() => {
                    clickHot();
                  }}
                  style={{
                    width: "20%",
                    borderWidth: 1,
                    padding: 10,
                    alignItems: "center",
                    margin: "5%",
                  }}>
                  <MaterialCommunityIcons
                    name="fire"
                    size={15}></MaterialCommunityIcons>
                  <Text>{hot}</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ color: "black", fontSize: 20, margin: "2%" }}>
                {I18n.t("Comment")} {commentCount} {I18n.t("Count")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: "10%",
                }}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    width: "80%",
                    padding: "5%",
                  }}
                  value={commentValue == null ? "" : commentValue}
                  onChangeText={(text: string) => {
                    setCommentValue(text);
                  }}
                  scrollEnabled={false}
                  multiline={true}></TextInput>
                <TouchableOpacity
                  onPress={onSubmitComment}
                  style={{
                    width: "20%",
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text>
                    {I18n.t("Comment")} {I18n.t("Create")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </View>
    </>
  );
}

export default Details;
