import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Drawer, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import I18n from "../../i18n";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions";
import reduxState from "../../types/reduxStateType";
import store from "../../redux/store";

// drawerNavigation을 공식 문서에 따라 custumizing해줌

const CustomDrawer = (props: any) => {
  /**
   * URL : API_URL
   * user : 현재 로그인한 유저
   * Logout :로그아웃 함수
   * IsLogined : 유저가 로그인 했는지 안했는지 확인 해주는 변수
   */
  const URL = useSelector((state: reduxState) => state.API.URL);
  const user = useSelector((state: reduxState) => state.User);
  const isLogined = store.getState().User.isLogined;
  const dispatch = useDispatch();
  const Logout = () => {
    axios
      .post(URL + "/auth/logout", {}, { withCredentials: true })
      .then((res) => {
        //로그아웃 성공시 전역변수에 만들어놓은 logout action을 일으키고 home페이지로 이동
        AsyncStorage.removeItem("user_info");
        dispatch(logout());
        props.navigation.reset({ routes: [{ name: "home" }] });
      })
      .catch((err) => console.log(err));
  };

  if (isLogined) { //유저가 액션을 한번 할떄마다 유저가 맞는지 아닌지를 check해주기 위해서 씀
    axios
      .post(URL + "/auth/userCheck", {}, { withCredentials: true })
      .then((res) => {
        if (!res.data) {
          dispatch(logout());
        }
      });
  }
  if (user.isLogined) { //로그인 됬을때 뜨는 함수
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          showsVerticalScrollIndicator={false}
          {...props}
          /* contentContainerStyle={{backgroundColor: 'purple'}} */
        >
          <View
            style={{
              height: "15%",
            }}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ marginTop: "5%", marginLeft: "5%" }}>
                <Avatar.Image
                  source={require("../public/annonymous.png")}></Avatar.Image>
              </View>
              <View style={{ alignItems: "center", marginLeft: "5%" }}>
                <>
                  <Text>{user.info.std_name}</Text>
                  <Text>{user.info.std_id}</Text>
                </>
              </View>
            </TouchableOpacity>
          </View>
          {
            //여기까지 profiles
          }
          <DrawerItemList {...props} />
          <View style={{ height: "80%", marginLeft: "10%", marginTop: "10%" }}>
            <Text>{I18n.t("Request")}</Text>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("BusRequest");
                }, 100);
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("BusRequest")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("OutRequest");
                }, 100);
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("OutRequest")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("GymRequest");
                }, 100);
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("GymRequest")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("ASRequest");
                });
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("ASRequest")}</Text>
              )}></DrawerItem>
            <Text>{"\n" + I18n.t("Inquery")}</Text>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("BusInquery");
                }, 100);
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("BusInquery")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("OutInquery");
                }, 100);
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("OutInquery")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("GymInquery");
                }, 100);
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("GymInquery")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("ASInquery");
                });
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("ASInquery")}</Text>
              )}></DrawerItem>
          </View>
        </DrawerContentScrollView>
        {
          //여기까지 보이는 Menu
        }
        <Drawer.Section>
          <DrawerItem
            icon={() => <Icon name="log-out" size={30}></Icon>}
            label="SIGN OUT"
            onPress={async () => {
              {
                /**Error 임시변수라서 StdNum이 앱 처음 불러와 있을 때는
                        StdNum이 존재 x 따라서 로그아웃기능 제대로 처리되지않을 가능성  */
              }
              try {
                Logout();
              } catch (err) {
                console.trace(err);
              }
            }}></DrawerItem>
        </Drawer.Section>
        {
          //Logout을 위해 App의 state인 stdNum과 AsyncStorage에 담겨있던 'stdNum'키 제거
        }
      </View>
    );
  } else {
    //Login된 상태가 아닐 때
    const loginWarning = () => {
      //시간나면 alert가 아니라 modal로도 표현해보고 싶음.
      alert("로그인 후 이용해주세요.");
    };
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          /* contentContainerStyle={{backgroundColor: 'purple'}} */
        >
          <TouchableOpacity
            onPress={() => {
              setTimeout(() => {
                props.navigation.navigate("SignIn");
              }, 100);
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                paddingBottom: "5%",
              }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginTop: "5%", marginLeft: "5%" }}>
                  <Avatar.Image
                    source={require("../public/annonymous.png")}></Avatar.Image>
                </View>
                <View style={{ alignItems: "center", marginLeft: "5%" }}>
                  <Text style={{ color: "black", fontWeight: "400" }}>
                    {I18n.t("PleaseLogin")}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {
            //터치 할 시 Login창으로 이동
          }
          <DrawerItemList {...props} />
          <View style={{ height: "80%", marginLeft: "10%", marginTop: "10%" }}>
            <Text>{I18n.t("Request")}</Text>
            <DrawerItem
              onPress={() => {
                loginWarning();
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("BusRequest")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                loginWarning();
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("OutRequest")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                loginWarning();
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("GymRequest")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                loginWarning();
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("ASRequest")}</Text>
              )}></DrawerItem>
            <Text>{"\n" + I18n.t("Inquery")}</Text>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("BusInquery");
                }, 100);
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("BusInquery")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("OutInquery");
                }, 100);
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("OutInquery")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("GymInquery");
                }, 100);
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("GymInquery")}</Text>
              )}></DrawerItem>
            <DrawerItem
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate("ASInquery");
                });
              }}
              label={() => (
                <Text style={{ color: "black" }}>{I18n.t("ASInquery")}</Text>
              )}></DrawerItem>
          </View>
        </DrawerContentScrollView>
      </View>
    );
  }
};
export default CustomDrawer;
