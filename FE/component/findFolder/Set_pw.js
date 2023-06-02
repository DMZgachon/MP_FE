import React, {useState} from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    TouchableHighlight, Modal, Alert
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {instance} from "../../api/axiosInstance";

function Set_pw(props){
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(props.route.params.phoneNumber)
    const [exPassword, setExPassword] = useState(props.route.params.exPassword)
    const [showPassword, setShowPassword] = useState(false);
    const onEnterBtn = () => {
        if (newPassword == '' || newPassword2 == ''){
            console.log('empty!')
            Alert.alert('새로운 비밀번호를 입력하세요!')
        }
        else{
            if(newPassword === newPassword2){
            }
            else{
                Alert.alert('비밀번호가 일치하지 않습니다!')
                return;
            }
            if(exPassword === ''){
                instance.post(`/api/auth/resetpassword`, {
                        phoneNumber: phoneNumber,
                        password : newPassword,
                        passwordConfirm: newPassword2,
                    },
                    {
                        withCredentials : true
                    }
                ).then((res)=>{
                    console.log(res.data)
                    Alert.alert('비밀번호 변경 성공')
                    props.navigation.navigate('Login');
                }).catch((err)=>{
                    console.log(err)
                    Alert.alert('비밀번호 변경 실패')
                });
            }
            else{
                instance.post(`/api/member/password`, {
                        exPassword : exPassword,
                        newPassword: newPassword,
                        phoneNumber: phoneNumber
                    },
                    {
                        withCredentials : true
                    }
                ).then((res)=>{
                    console.log(res.data)
                    Alert.alert('비밀번호 변경 성공')
                    props.navigation.navigate('Login');
                }).catch((err)=>{
                    console.log(err)
                    Alert.alert('비밀번호가 틀렸습니다')
                });
            }
        }
    }

    return(
        <View style={styles.container}>

            <View style={{flex: 2}}></View>
            <Text style={styles.Title}>비밀번호 재설정</Text>
            <View style={{flex: 1}}></View>

            <TextInput
                style={styles.textInput}
                placeholder="새로운 비밀번호 입력"
                secureTextEntry={!showPassword}
                onChangeText={text => setNewPassword(text)}
            />

            <View style={{flexDirection: "row"}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="새로운 비밀번호 재입력"
                    secureTextEntry={!showPassword}
                    onChangeText={text => setNewPassword2(text)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image
                        source={
                            showPassword
                                ? require('../img/visible.png')
                                : require('../img/invisible.png')
                        }
                        style={styles.E_image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}></View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{onEnterBtn()}
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

    Title:{
        marginLeft: '-5%',
        width: "55%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 25,
        color: "black"
    },
    button:{
        width: "70%",
        borderRadius: 40,
        height: "35%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#FF037C"
    },
    textBold:{
        marginLeft: '-5%',
        width: "55%",
        paddingTop: 40,
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 28,
        color: "black"
    },
    text:{
        marginLeft: '-5%',
        width: "55%",
        textAlign: "left",
        fontSize: 28
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
        height: 40,
        width: "65%",
        fontSize: 16,
        //borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    E_image: {
        width: 40,
        height: 50,
        position: 'absolute',
        right: 10,
        top: 15,
    },
});

export {Set_pw}