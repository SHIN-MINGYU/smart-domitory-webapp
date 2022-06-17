import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import axios from "axios";
import crypto from "crypto";
import { useSelector } from "react-redux";
import "moment/locale/ko";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommunityStackNavList } from "../../types/NavigationParamsType";
import reduxState from "../../types/reduxStateType";
import { CommunityData } from "../../types/ComunityDataTypes";

type Props = NativeStackScreenProps<CommunityStackNavList, "CommunityDetails">;

const SetCommunityItems = ({
  item,
  navigation,
}: {
  item: CommunityData;
  navigation: Props["navigation"];
}) => {
  /**
   *
   */
  const URL = useSelector((state: reduxState) => state.API.URL);
  const [userName, setUserName] = useState<string>("");
  const [commentCount, setCommentCount] = useState<number>();
  const watched = (id: string) => {
    axios
      .post(
        URL + "/bulletin/watch",
        {
          id,
        },
        { withCredentials: true }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.trace(err));
  };
  React.useEffect(() => {
    userId();
    axios
      .post(URL + "/comment/inquery", {
        bulletin_id: item.bulletin_id,
      })
      .then((res) => {
        const data = res.data.count;
        setCommentCount(data);
      })
      .catch((err) => console.log(err));
    return () => {
      setUserName("");
      setCommentCount(0);
    };
  }, []);
  const userId = () => {
    let hash = String(item.std_id);
    crypto.pbkdf2(hash, "salt", 10, 64, "sha512", (err, derivedKey) => {
      setUserName(derivedKey.toString("hex").substring(5, 12)); // '3745e48...08d59ae'
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        watched(item.bulletin_id);
        navigation.navigate("CommunityDetails", {
          item: item,
          id: userName,
        });
      }}>
      <View style={styles.item}>
        <View style={{ width: "80%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                marginRight: 10,
                color: "black",
              }}>
              {item.title}
            </Text>
            <Text style={{ color: "red" }}>({commentCount}) </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ paddingRight: 10 }}>
              {moment(item.create_date).fromNow()}
            </Text>
            <Text style={{ paddingRight: 10 }}>조회수 : {item.views}</Text>
            <Text>ID :{userName}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "10%",
          }}>
          <Text>{item.hot}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderTopWidth: 1,
    borderColor: "navy",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  title: {
    fontSize: 50,
  },
});

export default SetCommunityItems;
