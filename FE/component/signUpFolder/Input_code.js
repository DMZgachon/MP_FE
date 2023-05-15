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
import axios from "axios";
import instance from "../../api/axiosInstance";

function Input_code(props){

    const [name, setName] = useState(props.route.params.name)
    const [phoneNum, setPhoneNum] = useState(props.route.params.phoneNum)
    const [password, setPassword] = useState(props.route.params.password)
    const [verifyNum, setVerifyNum] = useState('')

    const onEnterBtn = () => {
        if (verifyNum == ''){
            console.log('empty!')
            Alert.alert('인증번호를 입력하세요!')
        }
        else{
            //휴대폰으로 인증번호 보내기 작업
            instance.get(`/api/auth/check/verifySMS`, {params: {code:verifyNum, to:phoneNum}},
                {
                    withCredentials : true
                }
            ).then((res)=>{
                console.log(res.data)
                if(res.data.data.success == true){
                    console.log('인증번호 일치, 회원가입 성공')

                    instance.post('/api/auth/signup', {
                        "name" : name,
                        "password":password,
                        "phonenumber":phoneNum
                    }).then((res)=>{
                        console.log(res.data)
                        props.navigation.navigate('Login');
                    })
                }
                else{
                    console.log("인증번호 오류")
                }
                props.navigation.navigate('Input_code', {name:name, phoneNum:phoneNum, password:password});
            })
                .catch((err)=>{console.log(err)});
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.navBox}>
                <TouchableOpacity style={styles.backBtn} onPress={()=>{
                    props.navigation.navigate('Input_name')}
                }>
                    <Image style={styles.backImg}
                           source={require('../img/backButton.png')}/>
                </TouchableOpacity>
            </View>

            <View style={{flex: 2}}></View>
            <Text style={styles.Title}>인증번호</Text>
            <Text style={styles.text}>입력 해주세용</Text>
            <View style={{flex: 1}}></View>

            <TextInput
                style={styles.textInput}
                placeholder="인증번호를 입력해주세요"
                secureTextEntry={true}
                onChangeText={text => setVerifyNum(text)}
            />
            <Text style={styles.buttonText2} >인증번호 재전송</Text>
            <View style={{flex: 2}}></View>

            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    onEnterBtn()}
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
    buttonText2:{
        textAlign: 'center',
        color: "#c77293",
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    textInput: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        width: "65%",
        //borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    }
});

export {Input_code}