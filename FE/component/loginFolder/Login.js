import axios from 'axios';
import Config from 'react-native-config';

import React, {useEffect, useState} from 'react';

import {
    SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    Button, StatusBar, TouchableHighlight, Modal, ToastAndroid, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SwipeButton from 'rn-swipe-button';
import { instance, setAccessTokenHeader } from "../../api/axiosInstance";

// 이제 Config.API_URL을 사용하여 API 요청을 수행할 수 있습니다.

function Login(props){
    const [phone, setPhone] = useState('01052672383');


    const handleSignup = () => {
        forceResetLastButton && forceResetLastButton()
        props.navigation.navigate('Signup');
    };

    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [password, setPassword] = useState('')
    let forceResetLastButton = null;


    return(
        <View style={styles.container}>
            <View style={styles.navBox}>
                <TouchableOpacity style={styles.backBtn} onPress={()=>{
                    props.navigation.navigate('MainPage')}
                }>
                    <Image style={styles.backImg}
                           source={require('../img/backButton.png')}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}></View>
            <Text style={styles.Title}>로그인</Text>
            <View style={{flex: 2}}></View>
            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'flex-start', marginLeft: '20%' }}>
                <SwipeButton
                    disabled={false}
                    swipeSuccessThreshold={30}
                    height={30}
                    width={80}
                    title={"log in"}
                    titleFontSize={13}
                    forceReset={ reset => {
                        forceResetLastButton = reset
                    }}
                    onSwipeSuccess={handleSignup}
                    railFillBackgroundColor="#f8c1c2"//(Optional)
                    railFillBorderColor="#f8c1c2" //(Optional)
                    thumbIconBackgroundColor="#ffffff" //(Optional)
                    thumbIconBorderColor="#ed9aff" //(Optional)
                    railBackgroundColor="#dd9b9c" //(Optional)
                    railBorderColor="#bbeaff" //(Optional)
                />
            </View>
            <TextInput
                style={styles.textInput}
                placeholder="전화번호를 입력해주세요."
                onChangeText={text => setPhoneNum(text)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="비밀번호를 입력해주세요."
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />
            <View style={{flex: 2}}>
                <TouchableOpacity onPress={()=>{
                    props.navigation.navigate('Set_pw_phone')}
                }>
                    <Text style={styles.buttonText2}>비밀번호를 잊어버리셨습니까?</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    // props.navigation.navigate('HomePage', {data : "My BucketList App"})
                    instance
                        .post('/api/auth/login', {
                            password: password,
                            phoneNumber: phoneNum,
                        })
                        .then(async (response) => { // async 키워드를 추가합니다.
                            console.log('We get resopne in login Page',response.data)
                            const pass = response.data.status

                            if(pass == 200){
                                console.log('Response in Login Page', response.data);
                                console.log('access Token in Login', response.data.data.accessToken);
                                console.log('refresh Toekn in Login', response.data.data.refreshToken);

                                setAccessToken(response.data.data.accessToken)
                                setRefreshToken(response.data.data.refreshToken)
                                console.log('we change accessToken', accessToken)
                                console.log('we change refreshToken', refreshToken)


                                // accessToken과 refreshToken을 직접 AsyncStorage에 저장합니다.
                                console.log('we setItme in asy store')
                                await AsyncStorage.setItem('accessToken', response.data.data.accessToken);
                                await AsyncStorage.setItem('refreshToken', response.data.data.refreshToken);

                                setAccessTokenHeader(response.data.data.accessToken) // axios header 저장

                                ToastAndroid.show('됐다', ToastAndroid.SHORT);

                                props.navigation.navigate('HomePage', { data: 'HomePage' });
                            }
                            else {
                                Alert.alert('회원가입이 되지 않았습니다람쥐')
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }

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
        padding: 10,
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
    contain: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    titleStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    Title:{
        width: "55%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 32,
        color: "black",
        alignItems: 'flex-start',
        marginLeft: '-5%'
    },
    button:{
        width: "70%",
        borderRadius: 40,
        height: "55%",
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
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonText2:{
        textAlign: 'center',
        color: "#fd007c",
        fontSize: 15,
        textDecorationLine: 'underline',
        marginTop: '5%'
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
    }
});

export {Login};