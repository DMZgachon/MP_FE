import React, {useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    Image,
    View,
    Button, TextInput, ToastAndroid, Alert,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "../Layout/footer";
import {Header} from '../Layout/Header';
import {useFocusEffect} from "@react-navigation/native";
import {getAccess} from "../../../api/reRefresh";
import {instance, setAccessTokenHeader } from "../../../api/axiosInstance";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ManagePage(props){
    let cancel;
    const [phoneNumeber, setPhoneNumber] = useState("");


    const showAlert = (content, id) => {
        Alert.alert(
            content,
            'Delete Sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        memberDelete();
                    }
                }
            ],
            { cancelable: false }
        );
    };

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
                        instance
                            .get('api/member/load', {})
                            .then(async (response) => {
                                console.log("Res: ", response);
                                console.log('Data : ',response.data.data)
                                setPhoneNumber(response.data.data.phoneNumber)
                            })
                            .catch((error) => {
                                if (axios.isCancel(error)) {
                                    console.log('Request canceled', error.message);
                                } else {
                                    // handle the error
                                    console.log('카테고리 발급 실패');
                                }
                            });


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

    const memberDelete = async () =>{
        await instance.delete(`/api/member/delete`,{

        }).then((response)=>{
            console.log('받은거',response.data.data)
            ToastAndroid.show('닌 사라져있다... 성공이다', ToastAndroid.SHORT);
            props.navigation.navigate('Login')


        }).catch((e)=>{
            console.log('삭제 실패',e)
        })
    }

    const Lougout = async () => {
        try {
            await AsyncStorage.clear()
            console.log('Logout')
        } catch(e) {
            // clear 에러를 처리합니다.
            console.error(e);
        }
    }



    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>

            <View style={styles.navBox1}>
                <View style={{ flex: 1}}></View>

                <View style={styles.inputContainer}>
                    <Text style={styles.text1}>저장된 나의 전화번호 </Text>
                    <Text style={styles.Title}> {phoneNumeber} </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: '-15%'}}>
                    <Text style={styles.settext}>프로필 편집</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Setting', {data : 'Setting'})}}>
                        <Image style={styles.moreImg} source={require('FE/component/img/more.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.settext}>비밀번호 재설정</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Check_pw', {data : 'Check_pw'})}}>
                        <Image style={styles.moreImg} source={require('FE/component/img/more.png')}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.editbtn} onPress={()=>{
                    Lougout()
                    props.navigation.navigate('Login')}}>
                    <Text style={styles.buttonText}>로그아웃</Text>
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', width: '90%'}}>
                    <TouchableOpacity  onPress={()=>{
                        showAlert()
                    }
                    }>
                        <Text style={styles.buttonText2}>계정 삭제하기</Text>
                    </TouchableOpacity>
                </View>
            </View>



            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 2, width : '100%', justifyContent : 'center'}}>
                    <Footer navigation = {props.navigation} data ={props.route.params.data}></Footer>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    storeCon:{
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'flex-end',
        width: '88%',
    },
    navBox1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: '100%',
        marginBottom: '5%',
        padding: '5%',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'column', // Here, change 'row' to 'column'
    },
    Title:{
        width: "100%",
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 17,
        color: "black"
    },
    text1:{
        width: '100%',
        fontSize: 16,
        color: "black",
        padding: 5,
    },
    textInput: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        width: "60%",
        fontSize: 16,
        //borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    settext:{
        width: '50%',
        fontSize: 16,
        color: "black",
        marginLeft: 20,
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    profileImg: {
        width: 90,
        height: 90,
        resizeMode: "cover",
    },
    moreImg:{
        marginLeft: 5,
        marginRight: 30,
        width: 20,
        height: 20,
        resizeMode: "cover",
    },
    editbtn:{
        marginTop: -15,
        width: "80%",
        borderRadius: 40,
        height: "8%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#e3e3f6"
    },

    buttonText:{
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
    },
    buttonText2:{
        textAlign: 'right',
        color: "#d91717",
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '20%'
    },
});

export {ManagePage}