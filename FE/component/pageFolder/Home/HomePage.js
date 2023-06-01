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
import {ca} from "date-fns/locale";

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
    const [sort, changeSort] = useState(0)

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
    const [rows,setRows] = useState(0);

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
                                console.log(Math.ceil(newItems.length / 2));
                                setRows(Math.ceil(newItems.length / 2));
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

    const sortingCategory = () => {
        // sort 값에 따라 정렬
        if(sort % 2 === 0){
            // sort가 짝수일 때, 두 번째 요소(인덱스 1)로 정렬
            changeCategory(categoryList.sort((a, b) => a[1].localeCompare(b[1])));
        } else {
            // sort가 홀수일 때, 세 번째 요소(인덱스 2)로 정렬
            changeCategory(categoryList.sort((a, b) => a[2] - b[2]));
        }

        // 클릭 횟수 증가
        changeSort(sort + 1);
    }


    return(
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>


            <View style={{position: 'absolute', top: 50, left: 330, right: 0, flexDirection: 'row'}}>
                <TouchableOpacity style={styles.EditButton} onPress={()=>{
                    props.navigation.navigate('Edit', {data : category})}
                }>
                    <Text style={{justifyContent: 'flex-start',marginLeft : '9%'}}>편집</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.EditButton} onPress={()=>{
                    sortingCategory();
                }
                }>
                    <Text style={{justifyContent: 'flex-start', marginLeft : '9%', fontSize : 30, marginTop: '-35%'}}>⇆</Text>
                </TouchableOpacity>
            </View>



            <View style ={{ width : '2500%', height : '70%', alignItems : 'center', margin : 3}}>
               <ScrollView>
                   <View style={{ flexDirection: 'column' }}>
                       {Array.from(Array(rows)).map((_, rowIndex) => (
                           <View style={{ flexDirection: 'column' }} key={rowIndex}>
                               {Array.from(Array(2)).map((_, colIndex) => {
                                   const index = rowIndex * 2 + colIndex;
                                   if (index < categoryList.length) {
                                       const content = categoryList[index];
                                       console.log(content);
                                       return (
                                           <TouchableOpacity
                                               onPress={() => {
                                                   props.navigation.navigate('Category', { data: content });
                                               }}
                                               key={index}
                                           >
                                               <View>
                                                   <View style={{ flexDirection: 'column', alignItems: 'center',
                                                        margin: 10, backgroundColor: 'white', borderRadius: 0, borderColor: 'black',
                                                       borderWidth: 1,}}>
                                                       <Text style={{fontSize:17, textAlign: 'center', color: 'black'}}>{content[1]}</Text>
                                                       <Image
                                                           style={{
                                                               width: 380,
                                                               height: 260,
                                                               borderColor: '#FFECEC',
                                                               borderWidth: 2,
                                                               flexDirection: 'row',
                                                               borderRadius: 0,
                                                           }}
                                                           source={{ uri: content[0] }}
                                                       />
                                                   </View>
                                               </View>
                                           </TouchableOpacity>
                                       );
                                   } else {
                                       return <View style={{ flex: 0.5 }} key={index} />;
                                   }
                               })}
                           </View>
                       ))}
                   </View>

               </ScrollView>


                <View style={{height : '3%', width : '100%', flexDirection : 'row'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%',}} onPress={()=>{
                        props.navigation.navigate('AddCategory', {data : 'AddCategory'})
                    }
                    }>
                        <Text style ={{fontSize : 10}}> 카테고리 추가하기 </Text>
                    </TouchableOpacity>
                </View>

            </View>




            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 2, width : '100%', justifyContent : 'center'}}>
                    <Footer navigation = {props.navigation} data ={props.route.params.data}
                        setIsModalVisible={setIsModalVisible} category={category} ></Footer>
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


});

export {HomePage}