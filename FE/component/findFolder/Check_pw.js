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
import {useFocusEffect} from "@react-navigation/native";
import {getAccess} from "../../api/reRefresh";
import {instance} from "../../api/axiosInstance";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Check_pw(props){
    let cancel;

    const [exPassword, setExPassword] =  useState("");

    useFocusEffect
    (
        React.useCallback(() => {
            console.log('Screen was focused');

            const getAndReissueTokens = async () => {
                const { accessToken, refreshToken } = await getAccess();

                if (cancel !== undefined) cancel();

                instance
                    .post('/api/auth/reissue', {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    })
                    .then(async (response) => {

                        await AsyncStorage.setItem('accessToken', response.data.data.accessToken);
                        await AsyncStorage.setItem('refreshToken', response.data.data.refreshToken);
                        console.log(response.data);
                    })
                    .catch((error) => {
                        if (axios.isCancel(error)) {
                            console.log('Request canceled', error.message);
                        } else {
                            // handle the error
                            console.log(error);
                        }
                    });
            }
            getAndReissueTokens().then(r => console.log('getAndReissueTokens'));

            return () => {
                console.log('Screen was unfocused');
                if (cancel !== undefined) cancel();
            };
        }, []) // 카테고리 목록 상태가 변경될 때마다 이 훅을 다시 실행
    );


    return(
        <View style={styles.container}>

            <View style={{flex: 2}}></View>
            <Text style={styles.Title}>현재 비밀번호</Text>
            <Text style={styles.text}>입력 해주세용</Text>
            <View style={{flex: 1}}></View>
            <TextInput
                style={styles.textInput}
                placeholder="현재 비밀번호를 입력해주세요"
                secureTextEntry={true}
                onChangeText={text => setExPassword(text)}
            />

            <View style={{flex: 1}}></View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    if(exPassword === '') {
                        Alert.alert('현재 비밀번호를 입력해주세요')
                    }
                    else{
                        props.navigation.navigate('Set_pw_phone', {exPassword: exPassword})
                    }
                }}>
                    <Text style={styles.buttonText}>입력</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 2,
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
        marginLeft: 25,
        marginTop: 8,
        width: 35,
        height: 30,
        resizeMode: "cover"
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
});

export {Check_pw}