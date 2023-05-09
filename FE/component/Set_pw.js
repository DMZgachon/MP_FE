import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    TouchableHighlight, Modal} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Set_pw(props){
    return(
        <View style={styles.container}>
            <View style={{flex: 2}}></View>
            <Text style={styles.Title}>비밀번호 재설정</Text>
            <View style={{flex: 1}}></View>
            <TextInput
                style={styles.textInput}
                placeholder="세로운 비밀번호 입력"
            />
            <TextInput
                style={styles.textInput}
                placeholder="새로운 비밀번호 재입력"
                secureTextEntry={true}
            />
            <View style={{flex: 1}}></View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    props.navigation.navigate('Login')}
                }>
                    <Text style={styles.buttonText}>저장</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white",
    },
    navBox: {
        width: "100%",
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backBtn: {
        justifyContent: 'flex-start',
        padding: "3%",
    },
    backImg: {
        marginLeft: 20,
        width: 35,
        height: 30,
        resizeMode: "cover"
    },
    Title:{
        width: "55%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 32,
        color: "black"
    },
    button:{
        width: "60%",
        height: "25%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#f3b1d0"
    },
    textBold:{
        width: "55%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 32,
        color: "black"
    },
    text:{
        width: "55%",
        paddingTop: 10,
        textAlign: "left",
        fontSize: 18
    },
    buttonText:{
        textAlign: 'center',
        color: 'black',
        fontSize: 20
    },
    textInput: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        //borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    }
});

export {Set_pw}