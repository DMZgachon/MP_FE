import React, {useState} from 'react';
import {Footer} from '../Layout/footer'
import {Header} from '../Layout/Header'

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
    Button, TouchableHighlight, TextInput, ToastAndroid, Alert,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import {getAndReissueTokens} from "../../../api/reRefresh";
import {instance} from "../../../api/axiosInstance";
import {launchImageLibrary} from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";



function AddCategory(props){
    // const CancelToken = axios.CancelToken;
    let cancel;

    let file;
    const [data, setData] = useState({}); // Add this line
    const [categoryName, setCategoryName] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useFocusEffect(
        React.useCallback(() => {
            console.log('Screen was focused');

            getAndReissueTokens(cancel).then(r => console.log('getAndReissueTokens'));

            return () => {
                console.log('Screen was unfocused');
                if (cancel !== undefined) cancel();
            };
        }, [])
    );

// 이미지를 불러왔는지 확인하는 상태 추가
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imgData,setImgData] = useState(new FormData());
    const ShowPicker = () => {
        //launchImageLibrary : 사용자 앨범 접근
        if(!imageLoaded) { // 이미지를 아직 불러오지 않았다면
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
                console.log("이미지 업로드 성공")

                const formdata = new FormData();

                formdata.append('categoryImage', file); // 카테고리 이미지 추가
                formdata.append('categoryName', categoryName); // 카테고리 이름 추가

                setImgData(formdata);
            });
        } else {
            console.log("Image already loaded"); // 이미 불러온 이미지가 있다면 메시지 출력
        }
    }


    const send = async () => {
        if(!categoryName) Alert.alert("카테고리 이름을 입력해주세요!");

        else{
            console.log("제목 :", categoryName);
            const access_token = await AsyncStorage.getItem("accessToken");
            // POST 요청 보내기
            await instance.post('/api/category/add', imgData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access_token}`,
                },
            }).then((response) => {
                //ToastAndroid.show('카테고리 업로드 성공이다', ToastAndroid.SHORT);
                console.log('success');

                Alert.alert('카테고리 등록',
                    '카테고리 등록 성공',
                    [
                        {
                            text: 'OK',
                            onPress: () => props.navigation.navigate('HomePage', {data: 'HomePage'})
                        }
                    ]);

            }).catch((res)=>{
                //ToastAndroid.show('카테고리 업로드 실패다', ToastAndroid.SHORT);
                Alert.alert('이미지를 선택해주세요!');
            });
        }
    }
    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>

            <TextInput
                placeholder="카테고리 이름을 입력해주세요."
                onChangeText={text => setCategoryName(text)}
                value={categoryName}
                style={styles.categoryInput}
            />

            <View style={{padding: 50}}>
                <View style={{marginBottom: 20}}>
                    <TouchableOpacity
                        onPress={() => {
                            ShowPicker();
                        }}
                        style={styles.Btn}
                    >
                        <Text style={{color: "black"}}>이미지 선택 버튼</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        send();
                    }}
                    style={styles.Btn}
                >
                    <Text style={{color: "black"}}>카테고리 만들기</Text>

                </TouchableOpacity>
            </View>


            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 2, width : '100%', justifyContent : 'center'}}>
                    <Footer navigation = {props.navigation} data ={props.route.params.data} Page = "Category"></Footer>
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
        backgroundColor: '#FFF4F4',
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    Btn: {
        width: 200,
        height: 45,
        backgroundColor: "#FEFFBE",
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
        alignItems: "center",
        borderRadius: 10
    },
    categoryInput: {

    }
});

export {AddCategory}