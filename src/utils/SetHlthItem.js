import React from "react";
import moment from "moment";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import I18n from "../../i18n";
import axios from "axios";
import { useSelector } from "react-redux";
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
function SetHlthItem({ item, loadData }) {
  const URL = useSelector((state) => state.API.URL);
  const onDelete = () => {
    axios
      .delete(URL + "/hlth/delete", { data: { hlth_id: item.hlth_id } })
      .then((res) => loadData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          marginTop: "2%",
          marginBottom: "2%",
        }}>
        <View style={details.innerbox}>
          <Text style={details.font}>
            {moment(item.date).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}>
            {item.start_time.slice(0, 2)}시 ~ {item.end_time.slice(0, 2)}시
          </Text>
        </View>
        <View style={details.innerbox}>
          <TouchableOpacity onPress={onDelete}>
            <Text style={details.font}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default SetHlthItem;
