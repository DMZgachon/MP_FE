import React from 'react';
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
    Button,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "../Layout/footer";
import {Header} from '../Layout/Header';
import {Setting} from "./Setting";
import {ManagaPage} from "./ManagePage";

function FriendPage(props){
    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>

            <View style={styles.navBox1}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={styles.profileImg} source={require('../../img/profile.png')}/>
                    <View style={{flex: 1}}>
                        <Text style={styles.text1}>이 름:  본인 이름  (본인 닉네임) </Text>
                        <Text style={styles.text2}>본인 ------- 목표</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.editbtn} onPress={()=>{props.navigation.navigate('Setting', {data : 'Setting'})}}>

                    <Text style={styles.buttonText}>프로필 편집</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.navBox2}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.settext}>프로 멤버십</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity style={styles.setbtn} onPress={()=>{props.navigation.navigate()}}>
                        <Text style={styles.buttonText}>업그레이드</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.settext}>계정 관리</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('ManagePage', {data : 'ManagePage'})}}>
                        <Image style={styles.moreImg} source={require('../../img/more.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.settext}>현재버전: 1.1.1</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity style={styles.setbtn2} onPress={()=>{props.navigation.navigate()}}>
                        <Text style={styles.buttonText}>최신 버전</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.settext}>자주 묻는 질문</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Question', {data : 'Question'})}}>
                        <Image style={styles.moreImg} source={require('../../img/more.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.2}}></View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.settext}>이용 약관</Text>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Condition', {data : 'Condition'})}}>
                        <Image style={styles.moreImg} source={require('../../img/more.png')}/>
                    </TouchableOpacity>
                </View>
            </View>


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
    navBox1: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fae7e9',
        width: "97%",
        height: '22%',
        marginTop: '3%',
        marginBottom: '3%',
        padding: '5%',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'column', // Here, change 'row' to 'column'
    },
    navBox2: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fce9ea',
        width: "97%",
        height: '48%',
        paddingTop: '-10%',
        padding: '5%',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'column', // Here, change 'row' to 'column'
    },
    text1:{
        width: '100%',
        fontSize: 16,
        color: "black",
        padding: 5,
    },
    text2:{
        width: '100%',
        fontSize: 16,
        color: "black",
        padding: 5,
    },
    settext:{
        width: '50%',
        fontSize: 16,
        color: "black",
        marginLeft: 20,
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    profileImg: {
        marginLeft: 5,
        marginRight: 30,
        width: 65,
        height: 65,
        resizeMode: "cover",
    },
    moreImg:{
        marginLeft: 5,
        marginRight: 30,
        width: 20,
        height: 20,
        resizeMode: "cover",
    },
    editbtn:{
        marginTop: 15,
        width: "90%",
        borderRadius: 40,
        height: "30%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#e3e3f6"
    },
    setbtn:{
        width: "30%",
        borderRadius: 10,
        height: "45%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#e3e3f6"
    },
    setbtn2:{
        width: "30%",
        borderRadius: 10,
        height: "45%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#eedadc"
    },
    buttonText:{
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
    },
});

export {FriendPage}