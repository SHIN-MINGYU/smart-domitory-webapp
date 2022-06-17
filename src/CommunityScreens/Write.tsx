import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import AppHeader from "../Custom/AppHeaders";
import axios from "axios";
import I18n from "../../i18n";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import reduxState from "../../types/reduxStateType";
import Icon from "react-native-vector-icons/AntDesign";
import { CommunityStackNavList } from "../../types/NavigationParamsType";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<CommunityStackNavList, "CommunityUpdate">;

type image = {
  localUri: string;
};

function Write({ navigation }: { navigation: Props["navigation"] }) {
  //2022-05-24 이미지추가할때 압축 끝 카메라로 연동되는 uri압축밑 업데이트 uri도 알고리즘 바꾸자
  const URL = useSelector((state: reduxState) => state.API.URL);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageList, setImageList] = useState<Array<image>>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const openImagePickerAsync = async (): Promise<void> => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      quality: 0.1,
    });

    if (pickerResult.cancelled === true) {
      return;
    }
    setLoading(true);
    const file = await ImageManipulator.manipulateAsync(
      pickerResult.uri,
      [{ resize: { width: 400, height: 400 } }],
      {
        compress: 0.2,
      }
    );

    const backUpList: Array<image> = imageList;
    setImageList(backUpList.concat([{ localUri: file.uri }]));
    setLoading(false);
  };

  const deleteImage = (localUri: string): void => {
    const newList = imageList.filter((el) => el.localUri != localUri);
    setImageList(newList);
  };

  const onSubmit = async (): Promise<void> => {
    if (!title || !content) {
      alert("제목 또는 내용을 입력해주세요");
      return;
    }
    axios
      .post(
        URL + "/bulletin/create",
        { title, content, images: imageList },
        { withCredentials: true }
      )
      .then((res) => {
        navigation.reset({ routes: [{ name: "CommunityMain" }] });
      })
      .catch((err) => {
        console.error(err);
      });
    // axios.요청방식(url, {key:value},).then((res)=>console.log(data))
    //url : http://192.168.0.15/community/create_process
  };
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync();

    // Explore the result

    if (!pickerResult.cancelled) {
      setLoading(true);
      const backUpList: Array<image> = imageList;
      setImageList(backUpList.concat([{ localUri: pickerResult.uri }]));
    }
    setLoading(false);
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
        <Modal visible={loading} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}>
            <ActivityIndicator
              animating
              style={{ position: "absolute" }}
              size="large"
            />
          </View>
        </Modal>
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
          </Pressable>
          <Pressable onPress={openCamera}>
            <Text>카메라</Text>
          </Pressable> */}
          {imageList ? (
            imageList.map((image, index) => (
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
            onPress={onSubmit}
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

export default Write;
