import React, { useState } from 'react';
import { PanResponder } from 'react-native';

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

function Signup(props) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [swipeButtonState, setSwipeButtonState] = useState(null);
    const handleLogin = () => {
        props.navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.navBox}>
                <TouchableOpacity style={styles.backBtn} onPress={() => {
                    props.navigation.navigate('MainPage')
                }
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
                    enableRightToLeftSwipe={true}
                    disabled={false}
                    swipeSuccessThreshold={-30}
                    height={30}
                    width={80}
                    title={"sign up"}
                    titleFontSize={13}
                    onSwipeSuccess={handleLogin}
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
                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate('Input_name')
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
        color: "black",
        alignItems: 'flex-start',
        marginLeft: '-5%'
    },
    button:{
        width: "68%",
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
        height: 40,
        position: 'absolute',
        right: 10,
        top: 15,
    },
    swipeButtonContainer: {
        flexDirection: 'row-reverse', // Reverse the direction of the swipe animation
        justifyContent: 'flex-end', // Align the swipe button to the right
        alignItems: 'center',
    },
    swipeButtonRail: {
        flex: 1,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#f8c1c2",
        borderWidth: 1,
        borderColor: "#f8c1c2",
    },
    swipeButtonRailFill: {
        height: '100%',
        borderRadius: 15,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ffffff',
    },
    swipeButtonThumbIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ffffff',
    },
});

export {Signup}