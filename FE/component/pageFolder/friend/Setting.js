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
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [selfIntroduction, setSelfIntroduction] = useState('');
    const [imageData, setImageData] = useState(null);
    const formData = new FormData(null);



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
            setProfileImage(res.data.data.profileImage)
            setNickname(res.data.data.nickname)
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
        await instance.post(`/api/member/introduction?introduction=` + selfIntroduction).then((response)=>{
            console.log('받은거',response.data.data)
            console.log('자기 소개 변경 완료')

            props.navigation.navigate('ManagePage',{data : 'setting'})

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
        if(1) { // 이미지를 아직 불러오지 않았다면
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
                setImageData(file)
            });
        } else {
            console.log("Image already loaded"); // 이미 불러온 이미지가 있다면 메시지 출력
        }
    }

    const send = async () => {
        let imageBlob;

        try {
            if (1) {

                const response = await fetch(imageData.uri);
                const blob = await response.blob();
                imageBlob = {
                    uri: imageData.uri,
                    type: imageData.type,
                    name: imageData.fileName,
                    data: blob
                };
                formData.append('profileImage', imageData);
                console.log("ImageData: " ,imageData);

                console.log("BucketImage: " ,formData);
                register();
                } else {
                    console.error('No image data');
                }
            } catch (error) {
                console.error('Error in creating Blob: ', error);
            }
    }

    const register = async () =>{
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'}
        };
        await instance.post('/api/member/update', formData,config)
            .then((res) => {
            console.log(res);
            changeName();
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

                    <View style={{ flex: 0.8}}></View>
                    <View style={styles.storeCon}>

                        <TouchableOpacity onPress={() => send()}>
                            <Text style={styles.buttonText2}>저장</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => ShowPicker()}>
                            <Image
                                style={{width: 90, height: 90}}
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
                                <Text style={{fontSize : 20}}> 닉네임변경 </Text>
                            </TouchableOpacity>
                             <Text style={styles.textInput}>{nickname}</Text>

                        </View>



                        <View style={styles.inputContainer}>
                            <Text style={styles.Title}>자기소개: </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={selfIntroduction ? selfIntroduction : '현재 자기소개'}
                                value={selfIntroduction}
                                onChangeText={text => setSelfIntroduction(text)}
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