import React, {useState} from 'react';

import {SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    Button, StatusBar, TouchableHighlight, Modal, ToastAndroid} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SwipeButton from 'rn-swipe-button';

function Login(props){
    const handleSignup = () => {
        props.navigation.navigate('Signup');
    };

    return(
            <View style={styles.container}>
                <View style={styles.navBox}>
                    <TouchableOpacity style={styles.backBtn} onPress={()=>{
                        props.navigation.navigate('MainPage')}
                    }>
                        <Image style={styles.backImg}
                               source={require('./backButton.png')}/>
                    </TouchableOpacity>
                </View>
            <View style={{flex: 1}}></View>
            <Text style={styles.Title}>로그인</Text>
            <View style={{flex: 2}}></View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <SwipeButton
                    disabled={false}
                    swipeSuccessThreshold={30}
                    height={30}
                    width={80}
                    title={"log in"}
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
            />
            <TextInput
                style={styles.textInput}
                placeholder="비밀번호를 입력해주세요."
                secureTextEntry={true}
            />
            <View style={{flex: 2}}>
                <TouchableOpacity onPress={()=>{
                    props.navigation.navigate('Set_pw_phone')}
                }>
                    <Text style={styles.buttonText2}>비밀번호 재설정</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    props.navigation.navigate('Upload')}
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
        color: "black"
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

export {Login}