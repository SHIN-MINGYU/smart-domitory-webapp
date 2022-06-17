import React, { useCallback } from "react";
import moment from "moment";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import I18n from "../../i18n";
import { AsData } from "../../types/MainDataTypes";
import axios from "axios";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";
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
function SetAsInquery({
  navigation,
  item,
  onLoadData,
}: {
  navigation: any;
  item: AsData;
  onLoadData: () => void;
}) {
  const URL = useSelector((state: reduxState) => state.API.URL);
  const onDelete = useCallback(() => {
    axios
      .delete(URL + "/as/delete", { data: { as_id: item.as_id } })
      .then(() => {
        onLoadData();
      })
      .catch((err) => console.log(err));
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
            {moment(item.request_date).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}>{item.title}</Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}>
            {item.repair_date ? (
              moment(item.repair_date).format("YYYY-MM-DD")
            ) : (
              <></>
            )}
          </Text>
        </View>
        <View style={details.innerbox}>
          {item.repair_date ? (
            <TouchableOpacity onPress={() => onDelete()}>
              <Text style={details.font}>{I18n.t("Delete")}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ASRequest", {
                  content: item.content,
                  title: item.title,
                  id: item.as_id,
                  vst_check: item.vst_check,
                })
              }>
              <Text style={details.font}>{I18n.t("Update")}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}
export default SetAsInquery;
