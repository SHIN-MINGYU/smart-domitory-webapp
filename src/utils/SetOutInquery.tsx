import React, { useCallback } from "react";
import moment from "moment";
import { View, Text, StyleSheet } from "react-native";
import I18n from "../../i18n";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";
import { OutData } from "../../types/MainDataTypes";

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
function SetOutInquery({
  item,
  setUpdated,
  updated,
}: {
  item: OutData;
  setUpdated: React.Dispatch<React.SetStateAction<number>>;
  updated: number;
}) {
  const URL = useSelector((state: reduxState) => state.API.URL);
  const deleteItem = useCallback(() => {
    axios
      .delete(URL + "/stayout/delete", {
        data: { stayout_id: item.stayout_id },
      })
      .then((res) => {
        setUpdated(updated + 1);
      });
  }, [item]);
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
            {moment(item.start_date).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}>
            {moment(item.end_date).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}>
            <TouchableOpacity onPress={deleteItem}>
              <Text>삭제</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </>
  );
}
export default SetOutInquery;
