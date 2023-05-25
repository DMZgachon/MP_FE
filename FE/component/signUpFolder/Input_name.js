import React, {useState} from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    TouchableHighlight, Modal, Alert, ToastAndroid
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { useLocation } from 'react-router-dom';

import axios from 'axios'
import {instance, setAccessTokenHeader} from "../../api/axiosInstance";

function Input_name(props){

    const [name, setName] = useState('')
    const [phoneNum, setPhoneNum] = useState(props.route.params.phoneNum)
    const [password, setPassword] = useState(props.route.params.password)

    const onEnterBtn = () => {
        if (name == ''){
            console.log('empty!')
            Alert.alert('이름을 입력하세요!')
        }
        else{
            //휴대폰으로 인증번호 보내기 작업
            instance.get(`/api/auth/check/sendSMS`, {params: {to:phoneNum}},

            ).then((res)=>{
                ToastAndroid.show("됐다", ToastAndroid.SHORT);
                props.navigation.navigate('Input_code', {name:name, phoneNum:phoneNum, password:password});
            })
                .catch((err)=>{console.log(err)});
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.navBox}>
                <TouchableOpacity style={styles.backBtn} onPress={()=>{
                    props.navigation.navigate('Signup')}
                }>
                    <Image style={styles.backImg}
                           source={require('../img/backButton.png')}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 2}}></View>
            <Text style={styles.Title}>이름</Text>
            <Text style={styles.text}>입력 해주세용</Text>
            <View style={{flex: 1}}></View>

            <TextInput
                style={styles.textInput}
                placeholder="이름을 입력해주세요."
                onChangeText={text => setName(text)}
            />
            <View style={{flex: 2}}></View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{onEnterBtn()}
                }>
                    <Text style={styles.buttonText}>입력</Text>
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
        width: "70%",
        borderRadius: 40,
        height: "45%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#FF037C"
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
        textAlign: "left",
        fontSize: 32
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    },
    textInput: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: "65%",
        height: 40,
        //borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    }
});

export {Input_name}