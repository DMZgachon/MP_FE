import React, {useState} from 'react';

import {SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    Button, StatusBar, TouchableHighlight, Modal, ToastAndroid, Alert} from 'react-native';


import { useNavigate } from 'react-router-dom';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SwipeButton from 'rn-swipe-button';

function Signup(props){
    const handleSignup = () => {
        forceResetLastButton && forceResetLastButton()
        props.navigation.navigate('Login');
    };
    const [phoneNum, setPhoneNum] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    let forceResetLastButton = null;

    function isValidPassword(password) {
        const digitRegex = /\d/g; // 숫자 확인
        const letterRegex = /[a-zA-Z]/g; // 알파벳 확인

        const digitCount = (password.match(digitRegex) || []).length;
        const letterCount = (password.match(letterRegex) || []).length;

        return digitCount >= 8 && letterCount >= 3;
    }

    const onEnterBtn = () => {
        if (phoneNum == '' || password == ''){
            console.log('empty')
            Alert.alert('전화번호와 비밀번호를 모두 입력하세요!')
        }else if(!isValidPassword(password)){
            Alert.alert('비밀번호 숫자8개, 알파벳3개 이상 넣어주세요! ')
        }
        else{
            props.navigation.navigate('Input_name', {phoneNum:phoneNum, password:password})
        }
    }

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
            <Text style={styles.Title}>회원가입</Text>
            <View style={{flex: 2}}></View>
            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'flex-start', marginLeft: '20%' }}>
                <SwipeButton
                    disabled={false}
                    swipeSuccessThreshold={30}
                    height={30}
                    width={80}
                    enableReverseSwipe={true}
                    forceReset={ reset => {
                        forceResetLastButton = reset
                    }}
                    title={"sign up"}
                    titleFontSize={13}
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
            <View style={{flexDirection: "row"}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="비밀번호를 입력해주세요."
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
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
        width: "68%",
        borderRadius: 40,
        height: "55%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#939379"
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
        color: "black",
        backgroundColor: "#ffffff",
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

export {Signup}