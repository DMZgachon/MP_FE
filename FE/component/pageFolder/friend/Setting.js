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
    TouchableOpacity, Platform, Modal
} from 'react-native';
import {Colors, DebugInstructions, LearnMoreLinks, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "../Layout/footer";
import {Header} from '../Layout/Header';

import ImagePicker from "react-native-image-picker";
import { launchImageLibrary } from 'react-native-image-picker';
import axios from "axios";

function Setting(props){//이름 설정 잘못함.. 셋팅이 아니라 프로필 편집 페이지임

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(null); // 프로필 사진 상태 변수
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [selfIntroduction, setSelfIntroduction] = useState('');
    // 프로필 사진 업로드 버튼 핸들러
    const handleProfileUpload = () => {
        // 이미지 라이브러리를 열어 사용자가 사진 선택하도록 함
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (!response.didCancel && response.assets.length > 0) {
                const selectedImage = response.assets[0];
                setProfileImage(selectedImage.uri); // 선택한 사진의 URI를 상태 변수에 설정
            }
        });
    };
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
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    // 프로필 업데이트 핸들러
    const handleUpdateProfile = () => {
        // 변경된 사진 데이터와 기타 필요한 데이터를 FormData로 생성
        const formData = new FormData();
        if (profileImage) {
            formData.append('profileImage', {
                uri: profileImage,
                type: 'image/jpeg', // 이미지 타입에 맞게 수정해야 합니다.
                name: 'profile.jpg', // 파일 이름에 맞게 수정해야 합니다.
            });
        }if (profileImage) {
            formData.append('profileImage', {
                uri: profileImage,
                type: 'image/jpeg',
                name: 'profile.jpg',
            });
        }
        formData.append('name', name);
        formData.append('nickname', nickname);
        formData.append('selfIntroduction', selfIntroduction);

        // axios를 사용하여 서버에 POST 요청 보내기
        axios
            .post('/api/updateProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                name: name,
                nickname: nickname,
                selfIntroduction: selfIntroduction,
            })
            .then(response => {
                // 프로필 업데이트 성공한 경우 처리할 로직 작성
                console.log('프로필 업데이트 성공:', response.data);
                // 프로필 업데이트에 성공한 경우 추가적인 작업 수행 가능
            })
            .catch(error => {
                // 프로필 업데이트 실패한 경우 처리할 로직 작성
                console.error('프로필 업데이트 실패:', error);
                // 프로필 업데이트에 실패한 경우 에러 처리
            });

        handleCloseModal();
    };


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
                    <TouchableOpacity onPress={handleUpdateProfile}>
                        <Text style={styles.buttonText2}>저장</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={handleProfileUpload}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        ) : (
                            <Image style={styles.profileImg} source={require('FE/component/img/profile.png')} />
                        )}
                    </TouchableOpacity>

                    {/* 프로필 사진 모달 */}
                    <Modal visible={isModalVisible} onRequestClose={handleCloseModal}>
                        <View>
                            <Button title="사진 업로드" onPress={handleProfileUpload} />
                            <Button title="프로필 업데이트" onPress={handleUpdateProfile} />
                            <Button title="취소" onPress={handleCloseModal} />
                        </View>
                    </Modal>
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
                    <Text style={styles.Title}>닉네임: </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={nickname ? nickname : '현재 닉네임'}
                        value={nickname}
                        onChangeText={text => setNickname(text)}
                    />
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