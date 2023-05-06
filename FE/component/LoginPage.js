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



    const [page, changePage] = useState('My BuketList')
    const images = [
        'https://www.korea.kr/newsWeb/resources/temp/images/000074/img_01.jpg',
        'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_2916,h_1944,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/eltdn5sjc3mnkq2sg3z7/NZONE퀸스타운스카이다이빙-클룩KLOOK한국.jpg',
        'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202204/03/089fb301-56e6-4169-b5c5-8efea295cdd6.jpg',
        'https://media.istockphoto.com/id/1392044276/ko/벡터/폴더-아이콘-스톡-그림-파일-폴더-링-바인더-아이콘-컴퓨터-데스크톱-pc.jpg?s=1024x1024&w=is&k=20&c=ZELmyl9nCe2EpYZ7C5gMSMaqwg2HLq_zmpQI4fhutT8='
    ];

    return(
        <View style={styles.container}>

            {/* 상단바 */}
            <View style ={styles.titlediv}>
                <Text style ={styles.title}> My BucketList App</Text>
                <View style ={{width : '100%',flexDirection :'row', justifyContent : 'flex-end'}}>
                    <TouchableOpacity style={styles.EditButton} onPress={()=>{
                        props.navigation.navigate('MainPage')}
                    }>
                        <Text style ={{flexDirection :'row', justifyContent : 'flex-start'}}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 편집 버튼*/}
            <View style ={{width : '100%',flexDirection :'row', justifyContent : 'flex-end'}}>
                <TouchableOpacity style={styles.EditButton} onPress={()=>{
                    props.navigation.navigate('Edit')}
                }>
                    <Text style ={{flexDirection :'row', justifyContent : 'flex-start'}}>편집</Text>
                </TouchableOpacity>
            </View>

            {/* Main에 카테고리 이미지 넣는 부분 */}
            <View style ={{ width : '100%', height : '60%'}}>
                <ScrollView>
                    {images.map((item, index) =>(
                        <View style ={{ margin : 3, alignItems : 'center'}}>
                            <Image
                                source={{uri: item}}
                                style={{ width: '70%', height: 200, }}/>
                        </View>
                    ))

                    }
                </ScrollView>
            </View>

            {/* 카테고리 추가 버튼*/}
            <View style={{height : '5%', width : '100%', flexDirection : 'row'}}>
                <TouchableHighlight style={{alignItems : 'center', width : '100%'}} onPress={handleOpenModal2}>
                    <Text style ={{fontSize : 15}}>카테고리 추가하기</Text>
                </TouchableHighlight>
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
                        props.navigation.navigate('FriendPage' ,{data : 'My Page'})}
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