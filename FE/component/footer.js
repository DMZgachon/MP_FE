import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,TouchableHighlight,
Modal} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

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

    console.log(props.data)
    useEffect(() =>{
       if(props.data == 'My BucketList App'){
           changePage(!ifMain)
           console.log('in if')
       }else {
           console.log('in else')
       }
    },[props.data])


    // 맞으면 + 아니면 이미지 로고
    return(
        <View style={styles.container}>
            <View style = {{width : '100%', height : '100%', flexDirection: 'row'}}>
                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('LoginPage', {data : 'My BucketList App'})}
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
                    ifMain ?  <View style ={{flex : 1.5, alignItems : 'center'}}>
                        <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                            props.setIsModalVisible(true)
                            props.navigation.navigate('addCategory',{data : 'addCategory Page'})}
                        }>
                            <Text style ={{fontSize : 35}}> + </Text>
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

            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}>
                <View>
                    <View style={{alignItems : 'center'}}>
                        <View style ={{width : '100%', height : '20%'}}>
                            <Text style ={{textAlign : 'center', fontSize : 30}}>새로운 버킷 리스트 추가하기</Text>
                        </View>
                        <View style ={{width : '80%', height : '70%', backgroundColor : 'gray', borderRadius : 10}}>
                            <Text style ={{textAlign : 'center'}}>버킷 리스트 이름 설정하기</Text>
                            <TextInput placeholder="버킷리스트 이름"></TextInput>
                            <Text style ={{textAlign : 'center'}}>버킷s 리스트 이름 설정하기</Text>
                            <TextInput placeholder="준비과정"></TextInput>
                            <TextInput placeholder="준비과정"></TextInput>
                            <TextInput placeholder="준비과정"></TextInput>
                            <TextInput placeholder="준비과정"></TextInput>

                        </View>
                        <View>
                            <TouchableHighlight onPress={handleCloseModal} underlayColor ="red"
                                                style={{width : '13%'}}>
                                <Text>돌아가기</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>



            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}>
                <View>
                    <View style={{alignItems : 'center'}}>
                        <View style ={{width : '100%', height : '20%'}}>
                            <Text style ={{textAlign : 'center', fontSize : 30}}>새로운 버킷 리스트 추가하기</Text>
                        </View>
                        <View style ={{width : '80%', height : '70%', backgroundColor : 'gray', borderRadius : 10}}>
                            <Text style ={{textAlign : 'center'}}>버킷 리스트 이름 설정하기</Text>
                            <TextInput placeholder="버킷리스트 이름"></TextInput>
                            <Text style ={{textAlign : 'center'}}>버킷s 리스트 이름 설정하기</Text>
                            <TextInput placeholder="준비과정"></TextInput>
                            <TextInput placeholder="준비과정"></TextInput>
                            <TextInput placeholder="준비과정"></TextInput>
                            <TextInput placeholder="준비과정"></TextInput>

                        </View>
                        <View>
                            <TouchableHighlight onPress={handleCloseModal} underlayColor ="red"
                                                style={{width : '13%'}}>
                                <Text>돌아가기</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={handleCloseModal2}>
                <View>
                    <View style={{alignItems : 'center'}}>
                        <View style ={{width : '100%', height : '20%'}}>
                            <Text style ={{textAlign : 'center', fontSize : 30}}>새로운 카테고리 추가하기</Text>
                        </View>
                        <View style ={{width : '80%', height : '70%', backgroundColor : 'gray', borderRadius : 10}}>
                            <Text style ={{textAlign : 'center'}}>카테고리 이름</Text>
                            <TextInput placeholder="카테고리 이름 설정"></TextInput>
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
        alignItems: 'center',
        position : 'absolute',
        bottom : 0,
    },
});

export {Footer}