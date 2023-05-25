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
    Button, TouchableHighlight, TextInput,
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



function addCategory(props){
    const CancelToken = axios.CancelToken;
    let cancel;


    const [data, setData] = useState({}); // Add this line
    const [phoneNumber, setPhoneNumber] = useState("");
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
                formdata.append('categoryImage', file); // 카테고리 이미지 추가
                formdata.append('categoryName', phoneNumber); // 카테고리 이름 추가

                const access_token = await AsyncStorage.getItem("accessToken");
                // POST 요청 보내기
                await instance.post('/api/category/add', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${access_token}`,
                    },
                }).then((response) => {
                    console.log('success');
                });
            });
        } else {
            console.log("Image already loaded"); // 이미 불러온 이미지가 있다면 메시지 출력
        }
    }


    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>

            <TextInput
                placeholder="전화번호를 입력하세요"
                onChangeText={text => setPhoneNumber(text)}
                value={phoneNumber}
            />

            <TextInput
                placeholder="이미지 URL을 입력하세요"
                onChangeText={text => setImageUrl(text)}
                value={imageUrl}
            />


            <Button
                title="버튼"
                onPress={() => {
                    ShowPicker();
                }}
            />

            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 2, width : '95%', justifyContent : 'center'}}>
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
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
});

export {addCategory}