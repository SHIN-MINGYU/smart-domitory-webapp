import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Modal,
} from "react-native";
import AppHeader from "../Custom/AppHeaders";
import axios from "axios";
import { useSelector } from "react-redux";
import I18n from "../../i18n";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/AntDesign";
import reduxState from "../../types/reduxStateType";
import { ImageData } from "../../types/ComunityDataTypes";
import { CommunityStackNavList } from "../../types/NavigationParamsType";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<CommunityStackNavList, "CommunityUpdate">;

type image = {
  localUri: string;
};

function Update({
  navigation,
  route,
}: {
  navigation: Props["navigation"];
  route: Props["route"];
}) {
  const URL = useSelector((state: reduxState) => state.API.URL);
  const [visible, setVisible] = useState<boolean>(false);
  const propsImages = useMemo<Array<image>>(
    () =>
      route.params.images.map((el: ImageData) => ({
        localUri: Buffer.from(el.path).toString(),
      })),
    []
  );
  const [title, setTitle] = useState<string>(route.params.item.title);
  const [content, setContent] = useState<string>(route.params.item.content);
  const [imageList, setImageList] = useState<Array<image>>(propsImages);
  const openImagePickerAsync = async (): Promise<void> => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      quality: 0.3,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    const backUpList = imageList;
    setImageList(backUpList.concat([{ localUri: pickerResult.uri }]));
  };
  const deleteImage = (localUri: string): void => {
    const newList: Array<image> = imageList.filter(
      (el: image) => el.localUri != localUri
    );
    setImageList(newList);
  };

  const updatePost = () => {
    axios
      .post(URL + "/bulletin/update", {
        title,
        content,
        id: route.params.item.bulletin_id,
        images: imageList,
      })
      .then((res) => {
        console.log(res);
        navigation.reset({
          routes: [{ name: "CommunityMain" }],
        });
      })
      .catch((err) => console.log(err));
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync();

    // Explore the result

    if (!pickerResult.cancelled) {
      const backUpList: Array<image> = imageList;
      setImageList(backUpList.concat([{ localUri: pickerResult.uri }]));
    }
  };
  return (
    <>
      <Modal visible={visible} transparent={true} animationType="slide">
        <Pressable
          onPress={() => setVisible(false)}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              position: "absolute",
              height: "20%",
              width: "100%",
              backgroundColor: "white",
              bottom: 0,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              borderColor: "#e9e9e9",
              borderWidth: 1,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderBottomColor: "#e9e9e9",
                borderBottomWidth: 1,
              }}>
              <Text style={{ fontWeight: "bold" }}>
                {I18n.t("SelectPictureType")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={openImagePickerAsync}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderBottomColor: "#e9e9e9",
                borderBottomWidth: 1,
              }}>
              <Text>{I18n.t("SelectInGalary")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openCamera}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Text>{I18n.t("TakeAPicture")}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      <AppHeader
        isLeft={true}
        title={I18n.t("CreateDetail")}
        navigation={navigation}></AppHeader>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <TextInput
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            // onFocus={}
            style={{
              height: "100%",
              paddingLeft: 10,
              fontSize: 20,
            }}
            placeholder={I18n.t("Title")}></TextInput>
        </View>
        <View style={{ flex: 5, backgroundColor: "white" }}>
          <TextInput
            style={{
              height: "100%",
              textAlignVertical: "top",
              padding: 10,
              fontSize: 20,
            }}
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
            placeholder={I18n.t("PleaseInput")}
            multiline={true}></TextInput>
        </View>
        <Text style={{ fontSize: 5, marginLeft: "2%", color: "red" }}>
          {I18n.t("WarningFileSize")}
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            borderTopColor: "#e9e9e9",
            borderBottomColor: "#e9e9e9",
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Icon name="picture" size={50} style={{ marginLeft: "2%" }}></Icon>
          </TouchableOpacity>
          {/* <Pressable onPress={openImagePickerAsync}>
            <Text>사진추가 </Text>
          </Pressable> */}
          {imageList ? (
            imageList.map((image, index: number | undefined) => (
              <TouchableOpacity
                onPress={() => deleteImage(image.localUri)}
                style={{ height: "100%", width: "10%", marginRight: "2%" }}
                key={index}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "contain",
                  }}
                  source={{ uri: image.localUri }}></Image>
              </TouchableOpacity>
            ))
          ) : (
            <></>
          )}
        </View>
        <View
          style={{
            // borderTopWidth: 1,
            // borderColor: '#e9e9e9',
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e9e9e9",
              borderRadius: 10,

              height: "40%",
              width: "30%",
            }}>
            <Text>{I18n.t("Cancle")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={updatePost}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e9e9e9",

              borderRadius: 10,
              height: "40%",
              width: "30%",
            }}>
            <Text>{I18n.t("Regist")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default Update;
