import React, {useEffect, useState} from 'react';
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
    Button, ToastAndroid,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "../Layout/footer";
import {Header} from '../Layout/Header';
import {Setting} from "./Setting";
import {ManagaPage} from "./ManagePage";
import {getAccess, getAndReissueTokens} from "../../../api/reRefresh";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance, setAccessTokenHeader } from '../../../api/axiosInstance'
import axios from "axios";


function FriendPage(props){

    let cancel;
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [message,setMessage] = useState("");
    const [profileImage, setProfileImage] = useState(); // 프로필 사진 상태 변수

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
                                setName(response.data.data.name);
                                setNickname(response.data.data.nickname);
                                setProfileImage(response.data.data.profileImage)

                                if (response.data.data.message == null) {
                                    setMessage("아자 아자 화이팅");
                                }
                                else setMessage(response.data.data.message);
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



    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>

            <View style={styles.navBox1}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={styles.profileImg}
                        source={profileImage ? {uri: profileImage} : require('../../img/default_profile.png')}
                    />
                    <View style={{flex: 1}}>
                        <Text style={styles.text1}>이 름:  {name}  ({nickname}) </Text>
                        <Text style={styles.text2}> "{message}"</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.editbtn} onPress={()=>{props.navigation.navigate('Setting', {data : 'Setting'})}}>

                    <Text style={styles.buttonText}>프로필 편집</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.navBox2}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.settext}>프로 멤버십</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity style={styles.setbtn} onPress={()=>{
                        ToastAndroid.show('최고 등급입니다', ToastAndroid.SHORT);

                    }}>
                        <Text style={styles.buttonText}>업그레이드</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.settext}>계정 관리</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('ManagePage', {data : 'ManagePage'})}}>
                        <Image style={styles.moreImg} source={require('../../img/more.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.settext}>현재버전: 1.1.1</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity style={styles.setbtn2} onPress={()=>{
                        ToastAndroid.show('최신버전입니다', ToastAndroid.SHORT);
                    }}>
                        <Text style={styles.buttonText}>최신 버전</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.settext}>자주 묻는 질문</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Question', {data : 'Question'})}}>
                        <Image style={styles.moreImg} source={require('../../img/more.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.2}}></View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.settext}>이용 약관</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Condition', {data : 'Condition'})}}>
                        <Image style={styles.moreImg} source={require('../../img/more.png')}/>
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
        backgroundColor: '#fdfdfe',
    },
    navBox1: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffe9e9',
        width: "97%",
        height: '22%',
        marginTop: '3%',
        marginBottom: '3%',
        padding: '5%',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'column', // Here, change 'row' to 'column'
    },
    navBox2: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffe9e9',
        width: "97%",
        height: '48%',
        paddingTop: '-10%',
        padding: '5%',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'column', // Here, change 'row' to 'column'
    },
    text1:{
        width: '100%',
        fontSize: 16,
        color: "black",
        padding: 5,
        fontWeight: 'bold'
    },
    text2:{
        width: '100%',
        fontSize: 16,
        color: "black",
        padding: 5,
        fontStyle: "italic"
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
        marginLeft: 5,
        marginRight: 30,
        width: 65,
        height: 65,
        resizeMode: "cover",
        borderRadius: 50,
    },
    moreImg:{
        marginLeft: 5,
        marginRight: 30,
        width: 20,
        height: 20,
        resizeMode: "cover",
    },
    editbtn:{
        marginTop: 15,
        width: "90%",
        borderRadius: 40,
        height: "30%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#cce6fc"
    },
    setbtn:{
        width: "30%",
        borderRadius: 10,
        height: "45%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#faf3d6"
    },
    setbtn2:{
        width: "30%",
        borderRadius: 10,
        height: "45%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#faf3d6"
    },
    buttonText:{
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
    }

});

export {FriendPage}