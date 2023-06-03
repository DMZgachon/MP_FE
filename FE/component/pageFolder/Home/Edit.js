import {Header} from '../Layout/Header'
import React, {Component, useState} from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    TouchableHighlight, Modal, Button, Alert, ToastAndroid
} from 'react-native'

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "../Layout/footer";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {getAndReissueTokens} from "../../../api/reRefreshToken";
import {instance, setAccessTokenHeader} from "../../../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Edit(props){


    const [category, changeCategory] = useState(props.route.params.data);

    const deleteImage = (id,content) => {
        instance
            .delete(`/api/category/delete/${id}`, {})
            .then(async (response) => {
                console.log('삭제요청됨' ,response.data);
                // 삭제 후 상태 업데이트
                let updatedCategory = category.filter(content => content[2] !== id);
                ToastAndroid.show(`${content} - 삭제되었습니다.`, ToastAndroid.SHORT);
                changeCategory(updatedCategory); // Update the state with the new array

                props.navigation.navigate('HomePage', { data: 'HomePage' });
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    // handle the error
                    console.log('삭제요청 실패');
                }
            });
    };

    const showAlert = (content, id) => {
        Alert.alert(
            content,
            '정말 삭제하시겠습니까?',
            [
                {
                    text: '취소',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: '네', onPress: () => {
                        console.log('id : ', id)
                        deleteImage(id,content); // Call deleteImage function
                    }
                }
            ],
            { cancelable: false }
        );
    };


    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = '카테고리 삭제'></Header>
            </View>

            <Text style={{fontSize: 17}}>삭제할 카테고리를 클릭하세요</Text>

            <View style ={{ width : '100%', height : '60%', alignItems : 'center', margin : 3}}>
                <ScrollView>
                    {
                        category.map((content, i ) =>{
                            return(
                                <View style={{ flexDirection: 'column', alignItems: 'center',
                                    margin: 25, backgroundColor: 'white', borderRadius: 50, borderColor: 'black',
                                    borderWidth: 1,}}>
                                    {
                                        console.log('id : ', content[2])
                                    }

                                    <TouchableOpacity

                                        onPress={() =>
                                        {showAlert(content[1], content[2])}
                                        } key={i}>
                                        <Text style={{fontSize:17, textAlign: 'center', color: 'black', margin: 5}}>  {content[1]}</Text>
                                        <Image
                                            style={{
                                                width: 300,
                                                height: 210,
                                                borderColor: '#FFECEC',
                                                borderWidth: 2,
                                                flexDirection: 'row',
                                                borderBottomLeftRadius: 50,
                                                borderBottomRightRadius: 50
                                            }}
                                            source={{uri : content[0]}}
                                        />
                                    </TouchableOpacity>

                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>



            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 2, width : '100%', justifyContent : 'center'}}>
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
        backgroundColor: '#FFF4F4'
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

export {Edit}