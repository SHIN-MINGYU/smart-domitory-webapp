import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import I18n from "../../i18n";
import moment from "moment";
import crypto from "crypto";
import axios from "axios";
import { useSelector } from "react-redux";
import "moment/locale/ko";
import reduxState from "../../types/reduxStateType";
import { CommentData, CommentUpdate } from "../../types/ComunityDataTypes";

function Comment({
  item,
  setCommentData,
  setCommentCount,
}: {
  item: CommentData;
  setCommentData: CommentUpdate["setCommentData"];
  setCommentCount: CommentUpdate["setCommentCount"];
}) {
  const [userId, setUserId] = useState<string>();
  const URL = useSelector((state: reduxState) => state.API.URL);
  React.useEffect(() => {
    hashId();
  }, []);
  const hashId = () => {
    let hash = String(item.std_id);
    crypto.pbkdf2(hash, "salt", 10, 64, "sha512", (err, derivedKey) => {
      setUserId(derivedKey.toString("hex").substring(5, 12)); // '3745e48...08d59ae'
    });
  };

  const onDeleteComment = () => {
    axios
      .delete(URL + "/comment/delete", {
        data: { comment_id: item.comment_id },
      })
      .then((res) => {
        axios
          .post(URL + "/comment/inquery", {
            bulletin_id: item.bulletin_id,
          })
          .then((res) => {
            setCommentData(res.data.rows);
            setCommentCount(res.data.count);
          })
          .catch((err) => console.log(err));
      });
  };

  return (
    <View
      style={{
        borderWidth: 1,
        padding: 5,
        backgroundColor: "white",
        borderColor: "#e9e9e9",
       }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>
          {I18n.t("CreateDetail")}
          {I18n.t("People")} :{" "}
        </Text>
        <Text style={styles.content}>{userId}</Text>
        <Text style={[styles.title, { marginLeft: "1%" }]}>
          {I18n.t("CreateDetail")}
          {I18n.t("day")} :{" "}
        </Text>
        <Text style={styles.content}>{moment(item.create_date).fromNow()}</Text>
      </View>
      <View style={{ flexDirection: "row-reverse", marginLeft: 10 }}>
        <TouchableOpacity onPress={onDeleteComment}>
          <Text>{I18n.t("Delete")}</Text>
        </TouchableOpacity>
      </View>
      <Text>{item.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
  },
  content: {
    marginRight: "1%",
  },
});
export default Comment;
