import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    TouchableHighlight, Modal} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function LoginPage(props){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOpenModal = () => {
        setIsModalVisible(true);
    };
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const [page, changePage] = useState('My BuketList')

    return(
        <View style={styles.container}>

            {/* 상단바 */}
            <View style ={styles.titlediv}>
                <Text style ={styles.title}> My Bucket Category</Text>
            </View>

            {/* 편집 버튼*/}
            <View style ={{width : '100%'}}>
                <TouchableOpacity style={styles.EditButton} onPress={()=>{
                    props.navigation.navigate('Edit')}
                }>
                    <Text style={styles.EditButton}>편집</Text>
                </TouchableOpacity>
            </View>

            {/* Main에 카테고리 이미지 넣는 부분 */}
            <View style ={{ width : '100%', height : '60%'}}>
                <ScrollView>
                    {[1,2,3,4,5].map(() =>(
                        <View style ={{flexDirection : 'row'}}>
                            <Image
                                source={require('../image/img.png')}
                                style={{ width: '50%', height: 200, }}/>

                            <Image
                                source={require('../image/img.png')}
                                style={{ width: '50%', height: 200 }}
                            />
                        </View>
                    ))

                    }
                </ScrollView>
            </View>

            {/* 카테고리 추가 버튼*/}
            <View style={{height : '5%', width : '100%', flexDirection : 'row'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('')}
                    }>
                        <Text style = {{flex : 1, textAlign : 'center'}}>카테고리 추가</Text>
                    </TouchableOpacity>
            </View>

            {/* 아래 하단바 footer */}
            <View style = {{width : '100%', height : '20%', flexDirection: 'row' }}>
                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('LoginPage', {data : 'MainPage'})}
                    }>
                        <Text style ={{fontSize : 35}}> 🏠 </Text>
                    </TouchableOpacity>
                </View>

                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('SearchPage', {data : 'Searching Page'})}
                    }>
                        <Text style ={{fontSize : 35}}> 🔍 </Text>
                    </TouchableOpacity>
                </View>

                <View style ={{flex : 3, alignItems : 'center'}}>
                    <TouchableHighlight style={{alignItems : 'center', width : '100%'}} onPress={handleOpenModal}>
                        <Text style ={{fontSize : 35}}>➕</Text>
                    </TouchableHighlight>
                </View>

                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('ChattingPage',{data : 'Chatting Page'})}
                    }>
                        <Text style ={{fontSize : 35}}> 💬 </Text>
                    </TouchableOpacity>
                </View>

                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('FriendPage' ,{data : 'Friend Page'})}
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

                           <Text style ={{textAlign : 'center'}}>버킷 리스트 이름 설정하기</Text>
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

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title : {
        fontSize : 25,
        padding : 20
    },

    titlediv : {
        width : '100%',
        borderBottomWidth: 1,
        borderColor: '#000',
        padding: 10,
        fontSize: 20,
    },

    EditButton : {
        padding : 5,
        fontSize : 18,
        textAlign : 'right'
    }
});

export {LoginPage}