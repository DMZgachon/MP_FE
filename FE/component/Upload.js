import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Pressable, Platform, PermissionsAndroid} from 'react-native';
import StepInput from "./StepInput";
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";

const imagePickerOption = {
    mediaType: "photo",
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === "android",
};
function Upload(props){
    const [countList, setCountList] = useState([1])
    const [calendar, setCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), "yyyy-MM-dd"),
    );
    const [title, setTitle] = useState("");
    const [content, setContent] = useState([]);
    const [hashtagList, setHashtagList] = useState([]);
    const [hashtag, setHashtag] = useState("");

    const onPickImage = (res) => {
        if (res.didCancel || !res) {
            return;
        }
        console.log("PickImage", res);
    }
    const addImage = () => {
        launchImageLibrary(imagePickerOption, onPickImage);
    }
    const onLaunchCamera = () => {
        launchCamera(imagePickerOption, onPickImage);
    };

    const onAddStep = () => {
        //alert('dd')
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
        setCountList(countArr)
    }
    const onRemoveStep = () => {
        let contentArr = [...content]
        contentArr.pop()
        setContent(contentArr)

        console.log(content)

        //alert('dd')
        let countArr = [...countList]

        countArr.pop()	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
        setCountList(countArr)
    }
    const onCalendar = () => {
        setCalendar(!calendar)
    }
    const onRegister = () => {

        let arr = hashtag.split("#").filter((word) => word !== "");
        setHashtagList(arr)
        console.log(hashtagList)
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.navBox}>
                <TouchableOpacity style={styles.backBtn} onPress={()=>{
                    props.navigation.navigate('MainPage')}
                }>
                    <Image
                        source={require('./backButton.png')}/>
                </TouchableOpacity>
                <Text style={styles.title}>새 버킷리스트</Text>
                <TouchableOpacity onPress={onRegister}>
                    <Text style={styles.enterBtn}>등록</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: "column", margin: "3%"}}>
                <TouchableOpacity onPress={addImage}>
                    <Image
                        style={
                            {width: 90, height: 90, marginLeft: 130}
                        }
                        source={require('./PlusImg.png')}/>
                </TouchableOpacity>
                <View>
                    <TextInput placeholder={"버킷리스트 제목 입력"} placeholderTextColor={'#BBB4B4'} style={styles.inputBox}
                        onChangeText={text => setTitle(text)}></TextInput>
                    <StepInput countList={countList} content={content} setContent={setContent}/>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity style={styles.plusBtn}
                                              onPress={onAddStep}>
                                <Text style={{textAlign: "center", fontSize: 16, color: "black"}}> 과정 추가  </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.plusBtn}
                                              onPress={onRemoveStep}>
                                <Text style={{textAlign: "center", fontSize: 16, color: "black"}}> 과정 삭제  </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            <Image
                                style={
                                    {width: 20, height: 30}
                                }
                                source={require('./qm.png')}/>
                            <Text>help!</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{ marginLeft: "4%"}} onPress={onCalendar}>
                        <Image
                            style={
                                {width: 35, height: 32}
                            }
                            source={require('./date.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.textBox}>{selectedDate}</Text>
                </View>
                {calendar && <Calendar onDayPress={(day)=>{
                    setSelectedDate(day.dateString)
                }}/>}
                <View>
                    <TextInput placeholder={"#을 이용해 태그를 입력해보세요!(최대 10개)"} placeholderTextColor={'#BBB4B4'} style={styles.inputBox}
                        onChangeText={text => setHashtag(text)}></TextInput>
                </View>
            </View>
            {/*<View style={{flex: 2}}></View>
            <Text style={styles.textBold}>안녕하세요.</Text>
            <Text style={styles.text}>로그인 해주세요.</Text>
            <View style={{flex: 2}}></View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    props.navigation.navigate('LoginPage')}
                }>
                    <Text style={styles.buttonText}>시작하기</Text>
                </TouchableOpacity>
            </View>*/}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    navBox: {
        width: "100%",
        height: 50,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F08484',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backBtn: {
        justifyContent: 'flex-start',
        padding: "3%"
    },
    title:{
        justifyContent: 'center',
        padding: "1.5%",
        fontWeight: 'bold',
        fontSize: 23,
        color: "black",
        textAlign: 'center'
    },
    enterBtn: {
        justifyContent: 'flex-end',
        fontSize: 16,
        padding: "3%",
        color: "#FFACAC"
    },
    inputBox: {
        fontSize: 16,
        borderBottomWidth: 1,
        width: "90%",
        borderStyle: 'solid',
        borderColor: '#F08484',
        justifyContent: 'center',
        margin:"3%"
    },
    textBox: {
        fontSize: 16,
        borderBottomWidth: 1,
        width: "75%",
        borderStyle: 'solid',
        borderColor: '#F08484',
        justifyContent: 'center',
        marginLeft: "4%",
        paddingBottom: 10
    },
    plusBtn:{
        padding: "1.5%",
        borderRadius: 10,
        width: "33%",
        height: "70%",
        backgroundColor: "#FACBCB",
        marginLeft: "3%"
    },
    button:{
        width: "80%",
        borderRadius: 40,
        height: "35%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#FF037C"
    },
    textBold:{
        width: "55%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 32,
        color: "black"
    },
    text:{
        width: "55%",
        textAlign: "left",
        fontSize: 32
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
});

export {Upload}