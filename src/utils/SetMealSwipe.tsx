import moment from "moment";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type mealData = {
  date: Date;
  breakfast: string;
  lunch: string;
  dinner: string;
};

function SetMealSwipe({ data }: { data: mealData }) {
  if (data) {
    const breakfast = data.breakfast.split(" ");
    const lunch = data.lunch.split(" ");
    const dinner = data.dinner.split(" ");
    return (
      <View
        style={{
          borderColor: "blue",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <View style={swiperStyles.title}>
          <Text style={swiperStyles.titleFont}>
            {moment(data.date).format("YYYY년 MM월 DD일 dddd")}
          </Text>
        </View>
        <View style={swiperStyles.outerBox}>
          <View style={swiperStyles.innerBox}>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>조식</Text>
                {breakfast ? (
                  breakfast.map((el, index) => <Text key={index}>{el}</Text>)
                ) : (
                  <Text>loading</Text>
                )}
              </View>
            </View>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>중식</Text>
                {lunch ? (
                  lunch.map((el, index) => <Text key={index}>{el}</Text>)
                ) : (
                  <Text>loading</Text>
                )}
              </View>
            </View>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>석식</Text>
                {dinner ? (
                  dinner.map((el, index) => <Text key={index}>{el}</Text>)
                ) : (
                  <Text>loading</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return <Text>loading</Text>;
  }
}

const swiperStyles = StyleSheet.create({
  title: {
    position: "absolute",
    top: "7%",
    backgroundColor: "white",
    zIndex: 100,
    width: "40%",
    alignItems: "center",
  },
  titleFont: {
    fontWeight: "bold",
    color: "black",
  },
  outerBox: {
    height: "80%",
    width: "90%",
    borderColor: "navy",
    borderWidth: 1,
    borderRadius: 15,
  },
  innerBox: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: "5%",
    alignItems: "center",
  },
  centerAlign: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  typeBox: {
    flexDirection: "column",
    alignItems: "center",
  },
  typeTitle: {
    fontWeight: "bold",
    color: "black",
    marginBottom: "5%",
  },
});
export default SetMealSwipe;
