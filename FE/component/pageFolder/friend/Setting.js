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
    TouchableOpacity, Platform, Modal, ToastAndroid
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
    const [profileImage, setProfileImage] = useState(null); // 프로필 사진 상태 변수
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [selfIntroduction, setSelfIntroduction] = useState('');
    // 프로필 사진 업로드 버튼 핸들러


    const { name: initialName, nickname: initialNickname, selfIntroduction: initialSelfIntroduction } = props.route.params.data;
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    useEffect(() => {
        setName(initialName);
        setNickname(initialNickname);
        setSelfIntroduction(initialSelfIntroduction);

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardStatus(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardStatus(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [initialName, initialNickname, initialSelfIntroduction]);

    // 모달 열기 핸들러
    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

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

    const changeNickName = () =>{
        instance.post(`/api/member/nickname`,{
        }).then((response)=>{
            console.log('닉네임 변경 완료')
        })
    }

    const changeIntroduction = async () =>{
        await instance.post(`/api/member/introduction?introduction=` + selfIntroduction).then((response)=>{
            console.log('받은거',response.data.data)
            console.log('자기 소개 변경 완료')
        }).catch((e)=>{
            console.log('자기소개 변경 실패',e)
        })
    }

    const changeName = async () =>{
        await instance.post(`/api/member/name?name=` + name).then((response)=>{
            console.log('받은거',response.data.data)
            ToastAndroid.show('이름은 왜바꾸니?(성공)', ToastAndroid.SHORT);
        }).catch((e)=>{
            console.log('자기소개 변경 실패',e)
        })
    }

    const [imageLoaded, setImageLoaded] = useState(false);
    const [imgData,setImgData] = useState(new FormData());

    const ShowPicker = () => {
        //launchImageLibrary : 사용자 앨범 접근
        if(!imageLoaded) { // 이미지를 아직 불러오지 않았다면
            launchImageLibrary({}, async (res) => {
                const uri = res?.assets?.[0]?.uri;
                const response = await fetch(uri);
                const blob = await response.blob();

                const formdata = new FormData();
                const file = {
                    name: res?.assets?.[0]?.fileName,
                    type: blob.type, // blob type 사용
                    uri: uri,
                    data: blob, // blob data 추가
                }
                formdata.append('profileImage', file); // 카테고리 이미지 추가

                setImgData(formdata);

                // const access_token = await AsyncStorage.getItem("accessToken");
                // // POST 요청 보내기
                // await instance.post('/api/category/add', formdata, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //         'Authorization': `Bearer ${access_token}`,
                //     },
                // }).then((response) => {
                //     console.log('success');
                // });
            });
        } else {
            console.log("Image already loaded"); // 이미 불러온 이미지가 있다면 메시지 출력
        }
    }

    const send = async () => {
        const access_token = await AsyncStorage.getItem("accessToken");
        // POST 요청 보내기
        await instance.post('/api/member/update', imgData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access_token}`,
            },
        }).then((response) => {
            console.log('profiel Image Change success', response.data.data)
            ToastAndroid.show('프로필 성공이다', ToastAndroid.SHORT);

        }).catch((res)=>{
            ToastAndroid.show('프로필 업로드 실패다', ToastAndroid.SHORT);
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
                        <TouchableOpacity onPress={send}>
                            <Text style={styles.buttonText2}>저장</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={ShowPicker}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                            ) : (
                                <Image style={styles.profileImg} source={require('FE/component/img/profile.png')} />
                            )}
                        </TouchableOpacity>

                        {/* 프로필 사진 모달 */}

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
                            <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                                changeName();
                            }
                            }>
                                <Text style ={{fontSize : 35}}> 이름 변경 </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                                    changeNickName();
                                }
                            }>
                                <Text style ={{fontSize : 35}}> 닉네임 변경 </Text>
                            </TouchableOpacity>
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

                        <View style={styles.inputContainer}>
                            <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                                changeIntroduction();
                            }
                            }>
                                <Text style ={{fontSize : 35}}> 자기소개 변경 </Text>
                            </TouchableOpacity>
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