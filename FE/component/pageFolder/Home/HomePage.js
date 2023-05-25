import React, {Component, useEffect, useState} from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    TouchableHighlight, Modal, ImageBackground, ToastAndroid
} from 'react-native';
import {Header} from '../Layout/Header'
import {Upload} from "./Upload";
import {Footer} from "../Layout/footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance, setAccessTokenHeader } from '../../../api/axiosInstance'
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";

function ImageButton(props) {
    return null;
}


function HomePage(props){
    //여기가 이제 + 버튼 관리하는 스테이트
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOpenModal = () => {
        setIsModalVisible(true);
    };
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const [addCategory, changeCategoryName] = useState('')
    const [addCategoryImage, changeCategoryImage] = useState('')


    //카테고리 추가 버튼 관리 스테이트
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const handleOpenModal2 = () => {
        setIsModalVisible2(true);
    };
    const handleCloseModal2 = () => {
        setIsModalVisible2(false);
    };

    const [accessT, setAccessT] = useState('')
    const [refreshT, setRefreshT] = useState('')
    const [chk, setChk] = useState(0)


    const [page, changePage] = useState('HomePage')
    // 나중에 서버로 부터 카테고리 받아올거임 근데 형식이 배열이 어떻게 되는지에 따라서 index 를 어떻게 지정할지 달라질듯
    const [category,changeCategory] = useState([

    ])
    const image = { uri: "https://reactjs.org/logo-og.png" };

    const getAccess = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const refreshToken = await AsyncStorage.getItem('refreshToken')
            console.log('IN getAccess method access : ', accessToken)
            console.log('IN getAccess method access : ', refreshToken)

            return { accessToken, refreshToken };
        } catch (error) {
            // handle the error
            console.log(error);
        }
    }

    const CancelToken = axios.CancelToken;
    let cancel;

    const [categoryList, setCategoryList] = useState([]); // 카테고리 목록 상태 추가

    useFocusEffect(
        React.useCallback(() => {
            console.log('Screen was focused');

            const getAndReissueTokens = async () => {
                const { accessToken, refreshToken } = await getAccess();

                // Cancel the previous request before making a new request
                if (cancel !== undefined) cancel();

                // 카테고리 목록이 비어있을 때만 API 요청
                // 카테고리 리스트를 먼저 비워줍니다
                setCategoryList([]);
                changeCategory([]);

                instance
                    .post('/api/auth/reissue', {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    })
                    .then(async (response) => {
                        instance
                            .get('api/category/categoryList', {})
                            .then(async (response) => {
                                console.log('id is : ', response.data.data.id)
                                const newItems = response.data.data.map(item => [item.categoryImage, item.categoryName, item.id]);

                                // Update the state.
                                changeCategory(prevItems => [...prevItems, ...newItems]);

                                // 카테고리 목록 상태 업데이트
                                setCategoryList(newItems);
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
            <View style ={{position: 'absolute', top: 50, left: 370, right: 0 }}>
                <TouchableOpacity style={styles.EditButton} onPress={()=>{
                    props.navigation.navigate('Edit', {data : category})}
                }>
                    <Text style ={{flexDirection :'row', justifyContent : 'flex-start'}}>편집</Text>
                </TouchableOpacity>
            </View>

            <View style ={{position: 'absolute', top: 20, left: 350, right: 0 }}>
                <TouchableOpacity style={styles.EditButton} onPress={()=>{
                    props.navigation.navigate('MainPage')}
                }>
                    <Text style ={{flexDirection :'row', justifyContent : 'flex-start'}}>로그아웃</Text>
                </TouchableOpacity>
            </View>



            <View style ={{ width : '2000%', height : '70%', alignItems : 'center', margin : 3}}>
                <ScrollView>
                    {
                        category.map((content, i ) =>{
                            return(
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate('Category',{data : content})
                                            {
                                                console.log(props.route.params.data)
                                            }
                                        }
                                        } key={i}>


                                        <View style={{ flexDirection: 'row' }}>
                                            <Image
                                                style={{
                                                    width: 130,
                                                    height: 220,
                                                    borderColor: 'blue',
                                                    marginRight : 5,
                                                    marginBottom: 10, // 이미지 간격 조절
                                                    flexDirection : 'row',
                                                    borderRadius : 10
                                                }}
                                                source={{uri : category[i][0]}}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>

            <View style={{height : '3%', width : '100%', flexDirection : 'row'}}>
                <TouchableOpacity style={{alignItems : 'center', width : '100%',}} onPress={()=>{
                    props.navigation.navigate('addCategory', {data : 'addCategory'})
                }
                }>
                    <Text style ={{fontSize : 10}}> 카테고리 추가하기 </Text>
                </TouchableOpacity>
            </View>


            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 1.5, width : '95%', justifyContent : 'center'}}>
                    <Footer navigation = {props.navigation} data ={props.route.params.data}
                            setIsModalVisible={setIsModalVisible} category={category} ></Footer>
                </View>
            </View>


            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}>
                <View>
                    <Upload navigation = {props.navigation}/>
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible2}
                onRequestClose={handleCloseModal2}>
                <View>
                    <View style={{alignItems : 'center'}}>
                        <View style ={{width : '100%', height : '20%'}}>
                            <Text style ={{textAlign : 'center', fontSize : 30}}>새로운 카테고리 추가하기</Text>
                        </View>
                        <View style ={{width : '80%', height : '70%', backgroundColor : 'gray', borderRadius : 10}}>
                            <Text style ={{textAlign : 'center'}}>카테고리 이름</Text>
                            <TextInput
                                placeholder="카테고리 이름 설정"
                                onChangeText={text => changeCategoryName(text)}
                                value={addCategory}
                            />
                            <Text style ={{textAlign : 'center'}}>이미지 첨부</Text>
                            <TextInput placeholder="이미지 주소 첨부하기"></TextInput>
                        </View>
                        <View>
                            <TouchableHighlight onPress={handleCloseModal2} underlayColor ="red"
                                                style={{width : '13%'}}>
                                <Text>돌아가기</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>


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
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },


});

export {HomePage}