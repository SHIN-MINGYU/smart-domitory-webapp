import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import Swiper from "react-native-web-swiper";
import SetMealSwipe from "../utils/SetMealSwipe";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";

//식사메뉴 캐러셀

function MealSwiper() {
  /**
   * URL : API_URL
   * data : 받아온 식사 data
   */
  const URL: string = useSelector((state: reduxState) => state.API.URL);
  const [data, setData] = useState<Array<any>>();
  useEffect(() => {
    axios.post(URL + "/admin/menu/app").then((res) => {
      setData(res.data);
    });
  }, []);
  if (data && data != []) {
    return (
      <>
        <Swiper
          style={{
            height: "90%",
          }}
          loof={true}>
          {data.map((el, index) => (
            <SetMealSwipe key={index} data={data[index]} />
          ))}
          {/* <SetMealSwipe data={data[0]} />
          <SetMealSwipe data={data[1]} />
          <SetMealSwipe data={data[2]} />
          <SetMealSwipe data={data[3]} />
          <SetMealSwipe data={data[4]} />
          <SetMealSwipe data={data[5]} />
          <SetMealSwipe data={data[6]} /> */}
        </Swiper>
      </>
    );
  } else {
    return (
      <Swiper
        style={{
          height: "90%",
        }}
        loof={true}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>데이터가 없거나 서버와 통신이 안되고있습니다.</Text>
        </View>
      </Swiper>
    );
  }
}

export default MealSwiper;
