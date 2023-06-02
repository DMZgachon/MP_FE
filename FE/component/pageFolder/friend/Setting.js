import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    Button,
    FlatList,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    Image,
    TouchableOpacity, Platform, Modal, ToastAndroid, Alert
} from 'react-native';
import {Colors, DebugInstructions, LearnMoreLinks, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "../Layout/footer";
import {Header} from '../Layout/Header';

import ImagePicker from "react-native-image-picker";
import { launchImageLibrary } from 'react-native-image-picker';
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {instance} from "../../../api/axiosInstance";
import {getAndReissueTokens} from "../../../api/reRefresh";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Setting(props){//이름 설정 잘못함.. 셋팅이 아니라 프로필 편집 페이지임

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(); // 프로필 사진 상태 변수
    const [introduction, setIntroduction] = useState(''); //
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [imageData, setImageData] = useState();
    const formData = new FormData(null);
    const [isClick, changeClick] = useState(0);



    // 프로필 사진 업로드 버튼 핸들러

    const [keyboardStatus, setKeyboardStatus] = useState(false);


    // 모달 닫기 핸들러

    // 프로필 업데이트 핸들러

    const CancelToken = axios.CancelToken;
    let cancel;

    useFocusEffect
    (
        React.useCallback(() => {
            console.log('Screen was focused');
            getAndReissueTokens(cancel).then(r => console.log('getAndReissueTokens'));
            return () => {
                console.log('Screen was unfocused');

                if (cancel !== undefined) cancel();
            };
        }, [])
    );

    useEffect(async ()=>{
        await instance.get('api/member/load').then((res)=>{
            console.log('get Data : ', res.data.data)
            setProfileImage(res.data.data.profileImage)
            setNickname(res.data.data.nickname)
            setName(res.data.data.name)
            setIntroduction(res.data.data.message)
            console.log('자기 소개 : ', introduction)
        }).catch((e)=>{
            console.log(e)
        })
    },[])

    const changeNickName = () =>{
        instance.post(`/api/member/nickname`,{
        }).then((response)=>{
            console.log('닉네임 변경 완료',response.data.data.nickname)
            setNickname(response.data.data.nickname)
        })
    }

    const changeIntroduction = async () =>{
        await instance.post(`/api/member/introduction?introduction=` + introduction).then((response)=>{
            console.log('받은거',response.data.data)
            console.log('자기 소개 변경 완료')
            props.navigation.navigate('FriendPage',{data : '내정보'})

        }).catch((e)=>{
            console.log('자기소개 변경 실패',e)
        })
    }

    const changeName = async () =>{
        await instance.post(`/api/member/name?name=` + name).then((response)=>{
            console.log('받은거',response.data.data)
            ToastAndroid.show('이름은 왜바꾸니?(성공)', ToastAndroid.SHORT);
            changeIntroduction();

        }).catch((e)=>{
            console.log('자기소개 변경 실패',e)
        })
    }

    const ShowPicker = () => {
        //launchImageLibrary : 사용자 앨범 접근
            launchImageLibrary({}, async (res) => {
                const uri = res?.assets?.[0]?.uri;
                const response = await fetch(uri);
                const blob = await response.blob();

                const file = {
                    name: res?.assets?.[0]?.fileName,
                    type: blob.type, // blob type 사용
                    uri: uri,
                    data: blob, // blob data 추가
                }
                console.log('asfdasdfdsafasdfsdafsdf',file)
                setImageData(file)
                setProfileImage(uri);
                send(file);
            });
    }

    const send = async (file) => {
        let imageBlob;
        // 이미지를 선택한 경우 이미지 blob
        if(1){ // add null check
            try{
                const response = await fetch(file.uri);
                const blob = await response.blob();
                imageBlob = {
                    uri: file.uri,
                    type: file.type,
                    name: file.fileName,
                    data: blob
                };
                formData.append('profileImage', file);
                console.log("ImageData: " ,file);
                console.log("BucketImage: " ,formData);


                register(formData);
            }catch (err){
                console.log('1 blob error : ',err)
            }
        }
    }

    const register = async (formData) =>{
        console.log('asdfasdfasdfasdfasdfasdfasdf',formData)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'}
        };
        instance.post('/api/member/update', formData,config)
            .then((res) => {
                console.log(res);
            }).catch((error) => {
                console.log("Error:", error);
            });
    }



    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.container}>

                <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                    <Header data = {props.route.params.data}></Header>
                </View>

                <View style={styles.navBox1}>

                    <View style={{ flex: 1}}></View>
                    <View style={styles.storeCon}>

                        <TouchableOpacity onPress={() => changeName()}>
                            <Text style={styles.buttonText2}>저장</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => ShowPicker()}>
                            <Image
                                style={styles.profileImg}
                                source={profileImage ? {uri: profileImage} : require('../../img/default_profile.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <View style={{ flex: 1}}></View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.Title}>이름: </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={name ? name : '현재 이름'}
                                value={name}
                                onChangeText={text => setName(text)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TouchableOpacity

                                onPress={() => changeNickName()}
                            >
                                <Text style={styles.Title1}> 닉네임변경: </Text>
                            </TouchableOpacity>
                            <Text style={styles.textInput}>{nickname}</Text>

                        </View>



                        <View style={styles.inputContainer}>
                            <Text style={styles.Title}>자기소개: </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={introduction ? introduction : '한줄 소개를 입력해 주세요'}
                                value={introduction}
                                onChangeText={text => setIntroduction(text)}
                            />

                        </View>

                    </ScrollView>
                    <TouchableOpacity style={styles.editbtn} onPress={()=>{props.navigation.navigate('ManagePage', {data : 'ManagePage'})}}>
                        <Text style={styles.buttonText}>계정 관리하기</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1}}></View>

                </View>

                {!keyboardStatus &&
                    <View style={styles.bottomView}>
                        <View style={{flexDirection: 'row', flex: 2, width: '100%', justifyContent: 'center'}}>
                            <Footer navigation={props.navigation} data={props.route.params.data}></Footer>
                        </View>
                    </View>
                }


            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fdfdfe',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
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
        width: "28%",
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 17,
        color: "black"
    },

    Title1:{
        width: "100%" ,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 17,
        color: "black",
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
        borderRadius: 50,
        marginBottom: 30,
    },
    moreImg:{
        marginLeft: 5,
        marginRight: 30,
        width: 20,
        height: 20,
        resizeMode: "cover",
    },
    editbtn:{
        marginBottom: 10,
        width: 250,
        borderRadius: 40,
        height: "8%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#dfeffd"
    },

    buttonText:{
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
    },
    buttonText2:{
        textAlign: 'right',
        color: "#d0739c",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '5%'
    },
});

export {Setting}