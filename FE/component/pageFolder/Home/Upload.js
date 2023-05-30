import React, {Component, useState, useEffect} from 'react';
import {Modal, View, Text, TouchableHighlight, Alert, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Pressable, Platform, PermissionsAndroid} from 'react-native';
import {StepInput} from "./StepInput";
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
import {useFocusEffect, useRoute} from "@react-navigation/native";
import {getAndReissueTokens} from "../../../api/reRefresh";
import axios from "axios";
import {Footer} from "../Layout/footer";
import { RadioButton } from 'react-native-paper';
import { instance, setAccessTokenHeader } from '../../../api/axiosInstance'
import RNFS from 'react-native-fs';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from 'react-native-dropdown-picker';


const imagePickerOption = {
    mediaType: "photo",
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === "android",
};
function Upload(props){
    const [countList, setCountList] = useState([""])

    const [calendar, setCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), "yyyy-MM-dd"),
    );

    const [title, setTitle] = useState([""]);
    const [imageData, setImageData] = useState(null);
    const [content, setContent] = useState(["default"]);
    const [hashtagList, setHashtagList] = useState(["default"]);
    const [hashtag, setHashtag] = useState("");

    const [visibility, setVisibility] = useState("공개");
    const [category, setCategory] = useState();
    const [accessToken , setAccess] = useState();
    const formData = new FormData();

    const CancelToken = axios.CancelToken;
    let cancel;

    const route = useRoute();
    const {data, category1} = route.params;
    console.log("받아졌나? :" , category1)

    const [selectedValue, setSelectedValue] = useState(null);
    const items = category1.map((item, index) => ({ label: item[1] , value: item[2] }));
    const [modalVisible, setModalVisible] = useState(false);

    async function fetchTokenAndSet() {
        const token = await AsyncStorage.getItem("accessToken");
        setAccess(token);
    }

    useFocusEffect(
        React.useCallback( () => {
            console.log('Screen was focused');

            getAndReissueTokens(cancel).then(r =>
                    console.log('Upload: getAndReissueTokens'),
                fetchTokenAndSet()
            )

            return () => {
                console.log('Screen was unfocused');
                if (cancel !== undefined) cancel();
            };

        }, [])
    );

    const onChangeTextHandler = text => {
        setTitle(text);
        //console.log('제목 :', title);
    }

    useEffect(() => {
        const splitHashtags = hashtag.trim().split("#");

        if (splitHashtags[0] === "") {
            splitHashtags.shift();
        }

        setHashtagList(splitHashtags);
    }, [hashtag]);


    // const onAddStep = () => {
    //     //alert('dd')
    //     let countArr = [...countList]
    //     let counter = countArr.slice(-1)[0]
    //     counter += 1
    //     countArr.push(counter)	// index 사용 X
    //     // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    //     setCountList(countArr)
    //}


    const onAddStep = () => {
        setCountList((prevCountList) => {
            const counter = prevCountList.slice(-1)[0] + 1;
            return [...prevCountList, counter];
        });
    }

    const onRemoveStep = () => {
        let contentArr = [...content]
        contentArr.pop()
        setContent(contentArr)

        //console.log(content)

        //alert('dd')
        let countArr = [...countList]

        countArr.pop()	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
        setCountList(countArr)
    }
    const onCalendar = () => {
        setCalendar(!calendar)
    }
    const onRegister = async () => {

        const splitHashtags = hashtag.trim().split("#");

        // 첫 번째 요소는 분리한 결과의 첫 부분이 공백 문자열("")일 가능성이 있으므로 제거
        if (splitHashtags[0] === "") {
            splitHashtags.shift();
        }

        setHashtagList(splitHashtags);

        console.log("hash :" , hashtagList)
        console.log("content: ", content)
        let imageBlob;

        formData.append('tagList', hashtagList);


        //formData.append('tagList', hashtagList);

        // 이미지 추가 (imageData가 File 혹은 Blob 객체인 경우)
        try {
            if (imageData && imageData.uri) {

                const response = await fetch(imageData.uri);
                const blob = await response.blob();
                imageBlob = {
                    uri: imageData.uri,
                    type: imageData.type,
                    name: imageData.fileName,
                    data: blob
                };

                formData.append('bucketImage', imageData);
                console.log("BucketImage: " ,imageData);
            } else {
                console.error('No image data');
            }
        } catch (error) {
            console.error('Error in creating Blob: ', error);
        }

        // 나머지 데이터 추가
        formData.append('bucketTitle', title);
        formData.append('visibility', visibility);

        formData.append('deadline', "2023-05-19 12:30:00");

        formData.append('category', category);

        // 컨텐츠 리스트 추가
        // Change this
        // content.forEach((item, index) => {
        //     formData.append('posts', item);
        // });
        formData.append('posts',content);



// To this, if the server expects a single field with a JSON array
        // formData.append('posts', JSON.stringify(content));



        //formData에 잘 저장되었는 지 확인
        console.log('-------------------------------------');
        //console.log("현재 받은 카테고리들:" , props.category)
        // console.log("Title: ", title);
        // console.log("content: ", content);
        // console.log("tagList: ", hashtagList);
        // console.log("visibility:", visibility);
        // // console.log("image: ", blob);
        // console.log("deadline: ", selectedDate);
        // console.log("category:" , category);
        console.log(formData)
        console.log('-------------------------------------');

        // axios로 데이터 전송
        //const access_token = await AsyncStorage.getItem("accessToken");
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : `Bearer ${accessToken}`
            }
        };
        await instance.post('api/bucket/add', formData, config)
            .then((res) => {
                console.log('Success:', res);
                if(res.status == 200) {
                    console.log("등록 성공");
                    Alert.alert('버킷 등록',
                        '이쿠죠!!!!!!!',
                        [
                            {
                                text: 'OK',
                                onPress: () => props.navigation.navigate('HomePage', {data: 'HomePage'})
                            }
                        ]);
                }
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }

    const pickImage = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response.didCancel || response.error) {
                console.log('Image picker cancelled or failed');
            } else {
                setImageData(response);
            }
        });
    };

    const ShowPicker = () => {
        //launchImageLibrary : 사용자 앨범 접근
        if(1) { // 이미지를 아직 불러오지 않았다면
            launchImageLibrary({}, async (res) => {
                const uri = res?.assets?.[0]?.uri;
                const response = await fetch(uri);
                const blob = await response.blob();

                const file = {
                    name: res?.assets?.[0]?.fileName,
                    type: blob.type, // blob type 사용
                    uri: uri,
                    data: blob, // blob data 추가
                }

                setImageData(file)
            });
        } else {
            console.log("Image already loaded"); // 이미 불러온 이미지가 있다면 메시지 출력
        }
    }
    const [bucketList, selectBucketList] = useState("");


    return(
        <View style={{flex: 1}}>
            <ScrollView style={styles.container}>
                <View style={styles.navBox}>
                    <TouchableOpacity style={styles.backBtn} onPress={()=>{
                        props.navigation.navigate('HomePage' , {data : 'HomePage'})}
                    }>
                        <Image
                            source={require('../../img/backButton.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>새 버킷리스트</Text>
                    <TouchableOpacity onPress={onRegister}>
                        <Text style={styles.enterBtn}>등록</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: "column", margin: "3%"}}>
                    <TouchableOpacity onPress={ShowPicker}>
                        <Image
                            style={{width: 90, height: 90, marginLeft: 130}}
                            source={imageData ? {uri: imageData.uri} : require('../../img/PlusImg.png')}
                        />

                    </TouchableOpacity>

                    <View>
                        <TextInput
                            placeholder={"버킷리스트 제목 입력"}
                            placeholderTextColor={'#BBB4B4'}
                            style={styles.inputBox}
                            onChangeText={onChangeTextHandler}
                            value={title}
                        />

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
                                {
                                    console.log('버킷리스트 입니다 : ', props.data)
                                }

                            </View>

                            <TouchableOpacity>
                                <Image
                                    style={
                                        {width: 20, height: 30}
                                    }
                                    source={require('../../img/qm.png')}/>
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
                                source={require('../../img/date.png')}/>
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


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <RadioButton.Group onValueChange={value => setVisibility(value)} value={visibility}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>공개</Text>
                                <RadioButton value="공개" />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>비공개</Text>
                                <RadioButton value="비공개" />
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={{marginTop: 22}}>
                        {//console.log("시발:", items)
                        }

                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(false);
                            }}
                        >
                            <View style={styles.container}>
                                <View>

                                    {items.map((item, index) => (
                                        <TouchableHighlight
                                            underlayColor="#FFECEC"
                                            key={index}
                                            style={styles.listItem}
                                            onPress={() => {
                                                setCategory(item.value);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text style={styles.listItemText}>
                                                {item.label}
                                            </Text>
                                        </TouchableHighlight>
                                    ))}

                                    <TouchableOpacity
                                        style={styles.hideModalButton}
                                        onPress={() => {
                                            setModalVisible(false);
                                        }}
                                    >
                                        <Text style={styles.hideModalButtonText}>닫기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        <TouchableOpacity style={styles.categoryBtn}
                                          onPress={() => {
                                              setModalVisible(true);
                                          }}
                        >
                            <Text style={{fontSize: 16, color: "black",}}>카테고리 선택</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>
            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 2, width : '95%', justifyContent : 'center'}}>
                    <Footer navigation = {props.navigation} data ={props.route.params.data}
                            category={category} ></Footer>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        overflow: 'visible', // 추가

    },
    navBox: {
        width: "100%",
        height: 50,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F08484',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
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
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    dropDownStyle: {
        flex: 1
    },
    chooseCg : {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8'
    },
    listItem: {
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 15,
        borderRadius: 5,
        elevation: 1, // for android
        shadowColor: "#000", // for ios
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    listItemText: {
        fontSize: 16,
        color: '#333'
    },
    hideModalButton: {
        backgroundColor: "#FACBCB",
        marginTop: 10,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    hideModalButtonText: {
        color: 'black',
        fontSize: 16
    },
    categoryBtn: {
        padding: "1.5%",
        borderRadius: 10,
        width: "32%",
        height: "26%",
        backgroundColor: "#FACBCB",
        marginLeft: "3%",
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export {Upload}