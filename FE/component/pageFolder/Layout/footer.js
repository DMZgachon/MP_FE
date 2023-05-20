import React, {Component, useEffect, useState} from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, TouchableHighlight,
    Modal, ToastAndroid
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import instance from "../../../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Footer(props){
    // 그 여기서 자신의 페이지 확인
    // 여기서 페이지 별 스테이트 만들고 메인페이지 인지 아닌지ç
    const [ifMain, changePage] = useState(false);

    //여기가 이제 + 버튼 관리하는 스테이트
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOpenModal = () => {
        setIsModalVisible(true);
    };
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    //카테고리 추가 버튼 관리 스테이트
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const handleOpenModal2 = () => {
        setIsModalVisible(true);
    };
    const handleCloseModal2 = () => {
        setIsModalVisible(false);
    };

    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const objectToken = new Object()
    const [JSONToken, setJSONToken] = useState({})

    useEffect(() =>{
        const getAccess = async () => {
            try {
                const storedValue = await AsyncStorage.getItem('accessToken');
                console.log('Stored value:', storedValue);
            } catch (e){
                console.log(e)
            }
        }

        // AsyncStorage.getItem('accessToken')
        //     .then((accessToken) => {
        //         setaccessToken(accessToken)
        //     })
        //     .catch((error) => {
        //         console.log('Error retrieving accessToken:', error);
        //     });
        //
        // AsyncStorage.getItem('refreshToken')
        //     .then((refreshToken) => {
        //         setRefreshToken(refreshToken)
        //     })
        //     .catch((error) => {
        //         console.log('Error retrieving accessToken:', error);
        //     });
        //
        // objectToken.accessToken = accessToken
        // objectToken.refreshToken = refreshToken
        //
        // setJSONToken(JSON.stringify(objectToken))

        if(props.data == 'My BucketList App'){
            changePage(!ifMain)
        }else {
        }
    },[props.data])


    // 맞으면 + 아니면 이미지 로고
    return(
        <View style={styles.container}>
            {  console.log(props.data) }
            <View style = {{width : '100%', height : '100%', flexDirection: 'row'}}>
                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        instance
                            .post('/api/auth/reissue', JSONToken,{
                                withCredentials: true,
                                headers: {"Content-Type": "application/json"}
                            })
                            .then((response) => {
                                const token = response.data.data.accessToken; // 응답 데이터에서 토큰 추출

                                ToastAndroid.show('됐다', ToastAndroid.SHORT);
                                props.navigation.navigate('HomePage', { data: 'HomePage' });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }}>
                        <Text style ={{fontSize : 35}}> 🔍 </Text>
                    </TouchableOpacity>
                </View>

                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%',}} onPress={()=>{
                        props.navigation.navigate('HomePage', {data : 'HomePage'})}
                    }>
                        <Text style ={{fontSize : 35}}> 12 </Text>
                    </TouchableOpacity>
                </View>




                {
                    ifMain ?  <View style ={{flex : 1.5, alignItems : 'center'}}>
                        <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                            props.setIsModalVisible(true)}
                        }>
                            <Text style ={{fontSize : 35}}> ➕ </Text>
                        </TouchableOpacity>
                    </View> : <View style ={{flex : 1.5, alignItems : 'center'}}>
                        <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                            props.navigation.navigate()}
                        }>
                            <Text style ={{fontSize : 35}}> Logo </Text>
                        </TouchableOpacity>
                    </View>
                }


                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%',}} onPress={()=>{
                        props.navigation.navigate('ChattingPage', {data : 'ChattingPage'})}
                    }>
                        <Text style ={{fontSize : 35}}> 💬 </Text>
                    </TouchableOpacity>
                </View>

                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('FriendPage', {data : 'FriendPage'})}
                    }>
                        <Text style ={{fontSize : 35}}> 👤 </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position : 'absolute',
        bottom : 0,
    },
});

export {Footer}