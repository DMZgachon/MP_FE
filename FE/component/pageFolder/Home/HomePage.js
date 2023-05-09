import React, {Component, useState} from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    TouchableHighlight, Modal, ImageBackground
} from 'react-native';
import {Header} from '../Layout/Header'
import {Upload} from "./Upload";

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "../Layout/footer";
import * as PropTypes from "prop-types";

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

    //카테고리 추가 버튼 관리 스테이트
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const handleOpenModal2 = () => {
        setIsModalVisible2(true);
    };
    const handleCloseModal2 = () => {
        setIsModalVisible2(false);
    };



    const [page, changePage] = useState('My BucketList App')
    // 나중에 서버로 부터 카테고리 받아올거임 근데 형식이 배열이 어떻게 되는지에 따라서 index 를 어떻게 지정할지 달라질듯
    const [category,changeCategory] = useState([
        ['https://www.korea.kr/newsWeb/resources/temp/images/000074/img_01.jpg', 'study'],
        ['https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_2916,h_1944,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/eltdn5sjc3mnkq2sg3z7/NZONE퀸스타운스카이다이빙-클룩KLOOK한국.jpg','sports'],
        ['https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202204/03/089fb301-56e6-4169-b5c5-8efea295cdd6.jpg','money'],
        ['https://media.istockphoto.com/id/1392044276/ko/벡터/폴더-아이콘-스톡-그림-파일-폴더-링-바인더-아이콘-컴퓨터-데스크톱-pc.jpg?s=1024x1024&w=is&k=20&c=ZELmyl9nCe2EpYZ7C5gMSMaqwg2HLq_zmpQI4fhutT8=','things']
    ])
    const image = { uri: "https://reactjs.org/logo-og.png" };



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



            <View style ={{ width : '100%', height : '70%', alignItems : 'center', margin : 3}}>
               <ScrollView>
                   {
                       category.map((content, i ) =>{
                           return(
                               <View>
                                  <View style={{alignContent : 'center'}}>
                                      <Text style={{fontSize : 20, paddingLeft : '35%'}}> <Text> [</Text> {content[1]} <Text>]</Text> </Text>
                                  </View>
                               <TouchableOpacity
                                   onPress={() => {
                                       props.navigation.navigate('Category',{data : content})
                                       {
                                           console.log(props.route.params.data)
                                       }
                                       }
                                   } key={i}>

                                   <Image
                                       style={{
                                           width: 300,
                                           height: 220,
                                           borderColor: 'blue',
                                           marginBottom: 10, // 이미지 간격 조절
                                           flexDirection : 'row'
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

            <View style={{height : '3%', width : '100%', flexDirection : 'row'}}>
                <TouchableHighlight style={{alignItems : 'center', width : '100%'}} onPress={handleOpenModal2}>
                    <Text style ={{fontSize : 15}}>카테고리 추가하기</Text>
                </TouchableHighlight>
            </View>


            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 1.5, width : '95%', justifyContent : 'center'}}>
                    <Footer navigation = {props.navigation} data ={props.route.params.data}
                        setIsModalVisible={setIsModalVisible} ></Footer>
                </View>
            </View>


            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}>
                {/*<View>*/}
                {/*    <View style={{alignItems : 'center'}}>*/}
                {/*        <View style ={{width : '100%', height : '20%'}}>*/}
                {/*            <Text style ={{textAlign : 'center', fontSize : 30}}>새로운 버킷 리스트 추가하기</Text>*/}
                {/*        </View>*/}
                {/*        <View style ={{width : '80%', height : '70%', backgroundColor : 'gray', borderRadius : 10}}>*/}
                {/*            <Text style ={{textAlign : 'center'}}>버킷 리스트 이름 설정하기</Text>*/}
                {/*            <TextInput placeholder="버킷리스트 이름"></TextInput>*/}
                {/*            <Text style ={{textAlign : 'center'}}>버킷s 리스트 이름 설정하기</Text>*/}
                {/*            <TextInput placeholder="준비과정"></TextInput>*/}
                {/*            <TextInput placeholder="준비과정"></TextInput>*/}
                {/*            <TextInput placeholder="준비과정"></TextInput>*/}
                {/*            <TextInput placeholder="준비과정"></TextInput>*/}

                {/*        </View>*/}
                {/*        <View>*/}
                {/*            <TouchableHighlight onPress={handleCloseModal} underlayColor ="red"*/}
                {/*                                style={{width : '13%'}}>*/}
                {/*                <Text>돌아가기</Text>*/}
                {/*            </TouchableHighlight>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</View>*/}
                {/*이거 안됨*/}
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