import React, { useCallback, useState } from "react";
import moment from "moment";
import { View, Text, StyleSheet } from "react-native";
import I18n from "../../i18n";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";
import { BusData } from "../../types/MainDataTypes";
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
function SetBusInquery({
  navigation,
  item,
  setUpdated,
  updated,
}: {
  navigation: any;
  item: BusData;
  setUpdated: React.Dispatch<React.SetStateAction<number>>;
  updated: number;
}) {
  const URL = useSelector((state: reduxState) => state.API.URL);
  const deleteItem = useCallback(() => {
    axios
      .delete(URL + "/bus/delete", {
        data: { bus_req_id: item.bus_req_id },
      })
      .then((res) => {
        setUpdated(updated + 1);
      });
  }, []);
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
            {moment(item.bus_date).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}>{item.bus_stop}</Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}>{item.bus_time}</Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}>
            {moment(item.bus_date).isAfter(new Date()) ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("BusRequest", { item: item })
                }>
                <Text>수정</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={deleteItem}>
                <Text>삭제</Text>
              </TouchableOpacity>
            )}
          </Text>
        </View>
      </View>
    </>
  );
}
export default SetBusInquery;
