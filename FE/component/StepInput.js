import React, {useState} from "react";
import {TouchableOpacity, Text, TextInput, StyleSheet, View} from "react-native";

const StepInput = (props) => {

    const onRegister = (i, text) => {
        props.content[i] = text;
        props.setContent([...props.content]);
    }
    return(
        <View>
            {props.countList && props.countList.map((item, i) => {
                return(
                    <View key={i}>
                        <TextInput placeholder={"STEP 설정"} placeholderTextColor={'#BBB4B4'} style={styles.inputBox}
                                   onChangeText={text => onRegister(i, text)}>
                        </TextInput>
                    </View>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        fontSize: 16,
        borderBottomWidth: 1,
        width: "90%",
        borderStyle: 'solid',
        borderColor: '#F08484',
        justifyContent: 'center',
        margin:"3%"
    }
})

export default StepInput;