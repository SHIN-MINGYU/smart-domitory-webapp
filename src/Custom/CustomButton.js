import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

//쓸려고 했는데 안씀. button을 어느정도 customizing했는데
const CustomButton = props => {
  /*
    @props onPress => 클릭시 이벤트
    @props color => backgroundColor
    @props textColor => textColor 
  */
  return (
    <TouchableOpacity onPress={() => (props.onPress ? props.onPress() : null)}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: props.color ? props.color : 'navy',
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {props.icon ? props.icon() : null}
        <Text
          style={{
            color: props.textColor ? props.textColor : 'white',
            fontWeight: 'bold',
            fontSize: props.fontSize ? props.fontSize : 15,
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default CustomButton;
