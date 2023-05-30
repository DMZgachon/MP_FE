import React, {Component, useEffect, useState} from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, TouchableHighlight,
    Modal, ToastAndroid, Image
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { instance, setAccessTokenHeader } from "../../../api/axiosInstance";
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

    const bucektCategory = props.category
    //console.log('footer 의 버킷리스트 받은거', props.category)
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    useEffect(() =>{
        const getAccess = async () => {
            try {
                const storedValue = await AsyncStorage.getItem('accessToken');
                //console.log('Stored value:', storedValue);
            } catch (e){
                console.log(e)
            }
        }

        if(props.data == 'HomePage'){
            changePage(true)
        }else {
        }
    },[props])


    // 맞으면 + 아니면 이미지 로고
    return(
        <View style={styles.container}>
            { // console.log("현재 페이지: ", props.data)
                 }
            <View style = {{width : '100%', height : '100%', flexDirection: 'row'}}>
                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('HomePage', {data : 'HomePage'})}
                    }>
                        <Text style ={{fontSize : 35}}> 🏠 </Text>
                    </TouchableOpacity>
                </View>

                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('SearchPage',{data : 'SearchPage'})}
                    }>
                        <Text style ={{fontSize : 35}}> 🔍 </Text>
                    </TouchableOpacity>
                </View>

                {
                    ifMain ?  <View style ={{flex : 1.4, alignItems : 'center'}}>
                        <TouchableOpacity style={{alignItems : 'center', width : '100%',}} onPress={()=>{
                            //console.log('category data : ',props.category)
                            props.navigation.navigate('Upload', {data : 'Upload', category1: props.category, navigation: props.navigation})
                        }
                        }>
                            <Text style ={{fontSize : 35, width: 80, height: 70, marginTop: -10, textAlign: 'center', textAlignVertical: 'center'}}> ➕ </Text>
                        </TouchableOpacity>
                    </View> : <View style ={{flex : 1.5, alignItems : 'center'}}>
                        <TouchableOpacity style={{alignItems : 'center', width : '100%',}} onPress={()=>{
                            props.navigation.navigate('HomePage', {data : 'HomePage'})}
                        }>
                            <Image
                                source={require('./../../img/꿈동이_new.png')}
                                style={{ width: 80, height: 70, marginTop: -10 }}
                            />
                        </TouchableOpacity>
                    </View>
                }


                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%',}} onPress={()=>{
                        props.navigation.navigate('ChattingPage', {data : 'ChattingPage'})}
                    }>
                        <Image
                            source={require('./../../img/150589_159693_4748.jpg')}
                            style={{ width: 80, height: 70, marginTop: -10 }}
                        />
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
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        position : 'absolute',
        bottom : 0,
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F08484',
    },
});

export {Footer}