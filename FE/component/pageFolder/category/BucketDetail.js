import React, {useCallback, useEffect, useState} from 'react';
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
    Button, Modal, TextInput, Alert,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "../Layout/footer";
import {Header} from '../Layout/Header'
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {getAndReissueTokens} from "../../../api/reRefresh";
import {instance} from "../../../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {launchImageLibrary} from "react-native-image-picker";
import CustomSwitch from "./CustomSwitch";
import {Bar} from "react-native-progress";
import styled from "styled-components";
import CheckBox from "react-native-check-box";
import { Calendar } from "react-native-calendars";
import {Checkbox} from "react-native-paper";

function BucketDetail(props){
    const [bucketImage, changeImage] = useState("");
    const [blobData, setBlobData] = useState(null);
    const [process, changeProcess] = useState(0);
    const [visibility, setVisibility] = useState("공개");
    const [deadLine, changeDeadLine] = useState();
    const [title1, changeTitle] = useState();
    const [category, setCategory] = useState(props.route.params.categoryId);
    const [tag, changeTag] = useState([]);
    const [step, changeStep] = useState([]);
    const [data, setData] = useState(props.route.params.data);
    const [id, setId] = useState(props.route.params.id);
    const [isEditing, setIsEditing] = useState(false);
    const formData = new FormData();
    const [accessToken , setAccess] = useState();
    const [imageData, setImageData] = useState(null);
    const [stepCheckStatus, setStepCheckStatus] = useState(step.map(() => false));
    const [checked, setChecked] = React.useState(false);
    const [modify, setModify] = useState(true);
    const [calendar, setCalendar] = useState(false);

    const CancelToken = axios.CancelToken;
    let cancel;
    const [bucketId, changeId] = useState();

    async function fetchTokenAndSet() {
        const token = await AsyncStorage.getItem("accessToken");
        setAccess(token);
    }

    useFocusEffect
    (
        React.useCallback(() => {
            console.log('Screen was focused');

            console.log('id : ', props.route.params.id);
            changeId(props.route.params.id);
            Promise.all([
                instance.get(`/api/bucket/bucketDetail/${props.route.params.id}`),
                instance.get(`/api/bucket/bucketListLoad/${props.route.params.id}`),
                instance.get(`/api/bucket/tagLoad/${props.route.params.id}`)
            ]).then((responses) => {
                console.log('First response: ', responses[0].data.data);
                changeImage(responses[0].data.data.bucketImage);
                console.log('bucketImage: ', Image);
                console.log('deadline: ', responses[0].data.data.deadline);
                changeDeadLine(responses[0].data.data.deadline.substring(0, 10))
                console.log('process: ', responses[0].data.data.process);
                changeProcess(responses[0].data.data.process)
                console.log('title: ', responses[0].data.data.title);
                changeTitle(responses[0].data.data.title)
                console.log('step: ', responses[1].data.data);
                changeStep(responses[1].data.data)
                console.log('tag: ', responses[2].data.data);
                changeTag(responses[2].data.data)
                console.log('data:' , data);
                console.log('id: ', id);
                setModify(props.route.params.modify);

            }).catch((error) => {
                console.log('bucket 오류');
            });

            getAndReissueTokens(cancel).then(r => console.log('getAndReissueTokens'), fetchTokenAndSet());
            return () => {
                console.log('Screen was unfocused');
                if (cancel !== undefined) cancel();
            };
        }, [props])
    );

    useEffect(() => {
        console.log("modify 혀용 여부:"+props.route.params.modify);

        },[modify]);
    useEffect(() => {
        fetch('https://storage.googleapis.com/mp-be/14c24bd6-a8b9-4539-af3d-1fd1a503bba9')
            .then(response => response.blob())
            .then(blob => {
                setBlobData(blob);
                console.log("nnnn: ", blobData);
            })
            .catch(error => console.error(error));
    }, [process]);

    const toggleEditing = useCallback(() => {
        setIsEditing(!isEditing);
    }, [isEditing]);


    const handleTextChange = useCallback((newText) => {
        changeTitle(newText);
    }, []);


    const handleDeadlineChange = useCallback((newText) => {
        changeDeadLine(newText);
    }, []);

    const changeTagContent = (index) => (newText) => {
        changeTag(prevTag => prevTag.map((item, i) => i === index ? {...item, content: newText} : item));
    }

    const onChangeStep = (index) => (newText) => {
        changeStep(prevTag => prevTag.map((item, i) => i === index ? {...item, content: newText} : item));
        console.log('changeStep : ', step)
    }


    const DeleteStep =(content) =>{
        const newSteps = step.filter((item) => item.content !== content);
        changeStep(newSteps);
        console.log('삭제 완료 : ', step)

        const successCount = newSteps.filter(step => step.success).length;
        const newProcess = Math.floor((successCount / newSteps.length) * 100);

        // process 상태 업데이트
        changeProcess(newProcess);
        deleteFunction(step)
    }

    const deleteFunction = (ct) =>{

        instance.post(`/api/bucket/updateList/${id}`, step)
            .then((res) => {
                console.log('Delete Success: ', step);
            })
            .catch((error) => {console.log("updateList :", error)})
    }


    const toggleSuccess = (index, content) => {
        // const newSteps = [...step]; // 현재 steps 배열을 복사합니다.
        // newSteps[index].success = !newSteps[index].success; // success 값을 뒤집습니다.
        // changeStep(newSteps); // 새로운 steps 배열을 설정합니다.
        // console.log('toggleSUcess 입니다 : ',newSteps[index].success)
        const newSteps = [...step];
        newSteps[index].success = !newSteps[index].success;
        changeStep(newSteps);

        // 성공한 체크박스의 비율을 계산
        const successCount = newSteps.filter(step => step.success).length;
        const newProcess = Math.floor((successCount / newSteps.length) * 100);
        // process 상태 업데이트
        changeProcess(newProcess);
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

    const onSelectSwitch = index => {
        //이게 지금 반대로 되고 있는 거 같은데?=
        alert(index + '공개 설정을 하였습니다. ');
        setVisibility(index + '공개');
        console.log("보여지나? :", visibility);
    };


    const onRegister = async () => {

        let imageBlob;
        const tagList = tag.map(item => item.content);
        console.log("tag 확인: ", tag);
        console.log("tag 확인:", tagList);
        console.log("step 확인: ", step)
        //1. 버킷 업데이트 부분
        if (blobData) {
            //데이터 세팅
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
                }
            } catch (error) {
                console.error('Error in creating Blob: ', error);
            }

            formData.append('visibility', visibility);
            formData.append('category', category);
            formData.append('title', title1);
            formData.append('deadline', deadLine + " 12:30:00");
            formData.append('id', id);

            //formData에 잘 저장되었는 지 확인
            console.log('-------------------------------------');
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
            await instance.post(`/api/bucket/update/${id}`, formData, config)
                .then((res) => {
                    console.log('버킷 변경 Success:', res);
                    if(res.status == 200) {
                        console.log("1. 버킷 변경 성공");
                        //------------------------------------------------------------------------
                        //2. 태그 업데이트 부분
                        instance.post(`/api/bucket/tag/${id}`, tagList)
                            .then((res) => {
                                console.log('태그 변경 Success: ', res);
                                if(res.status == 200){
                                    console.log("2. 태그 변경 성공");
                                }
                            })
                            .catch((error) => {console.log("2. Error:", error)})

                        instance.post(`/api/bucket/updateList/${id}`, step)
                            .then((res) => {
                                console.log('스텝 변경 Success: ', res);
                            })
                            .catch((error) => {console.log("updateList :", error)})

                    }
                })
                .catch((error) => {
                    console.log("1. Error:", error);
                });
        } else {
            console.log("Blob data is not ready yet");
        }


    }

    const BarView = styled.View`
      width: 100%;
      padding: 0 15px;
      flex-direction: row;
      margin-top: 20px;
    `;

    const Bar = styled.View`
      margin: 10px 0;
      flex: 1;
    `;

    const BarText = styled.Text`
      width: 40px;
      text-align: center;
      font-size: 15px;
      padding: 3px 0 0 5px;
    `;

    const ProgressBar = ({process}) => {
        const barWidth = process > 100 ? 100 : (process < 0 ? 0 : process);
        return (
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    <View style={[styles.progress, { width: `${barWidth}%` }]} />
                </View>
            </View>
        );
    };

    const DeleteBucket = () =>{
        instance.delete(`/api/bucket/delete/${id}`)
            .then((res) => {
                console.log('bucket delete Success: ', res);})
            .catch((error) => {console.log("updateList :", error)})
    }

    const addStep = (step) =>{
        instance.post(`/api/bucket/updateList/${id}`, step)
            .then((res) => {
                console.log('Add Success: ', step);
            })
            .catch((error) => {console.log("Add :", error)})
    }

    const addTag = (tag) =>{
        const tagList = tag.map(item => item.content);
        instance.post(`/api/bucket/tag/${id}`, tagList)
            .then((res) => {
                console.log('Add Success: ', tagList);
            })
            .catch((error) => {console.log("Add :", error)})
    }

    const onCalendar = (res) => {
        setCalendar(!calendar)
    }

    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>

            <View style={{height: "90%", overflow: 'visible'}} nestedScrollEnabled={true} scrollEnabled={true}>
                { isEditing ? (

                    <View style={{flexDirection: "column", margin: "3%", marginBottom: "11%"}}>
                        <View style={{...styles.storeCon, marginLeft: 30}}>
                            <TouchableOpacity onPress={() => {
                                toggleEditing();
                                onRegister();
                            }}>
                                <Text style={styles.buttonText2}>저장</Text>
                            </TouchableOpacity>

                            <TouchableOpacity   onPress={() => {
                                DeleteBucket();
                                props.navigation.navigate('HomePage', {data : 'HomePage'})

                            }}>
                                <Text style={styles.buttonText3}>삭제</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{height: "80%"}}>
                        <TextInput style={{...styles.Title, marginLeft:"20%", borderBottomWidth: 1,width: "60%", marginBottom: 10}} onChangeText={handleTextChange}
                                   value={title1} placeholder={title1}></TextInput>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: "10%"}}>
                            <TouchableOpacity onPress={ShowPicker}>
                                <Image
                                    style={{width: 160, height: 160, marginLeft: -10}}
                                    source={bucketImage ? {uri: bucketImage} : require('../../img/PlusImg.png')}
                                />
                            </TouchableOpacity>


                            <View style={{flex: 1}}>
                                <View style={{flexDirection: "row", width: 100, marginBottom: 5}}>
                                    <Text style={{...styles.text1, marginLeft: 20}}>기한: </Text>
                                    {/*<Text style={{...styles.text1, marginLeft: 0}}>{selectedDate}</Text>*/}
                                    <Text style={{...styles.text1, marginLeft: -50, marginTop: 2}}>{deadLine}</Text>
                                </View>
                                <TouchableOpacity style={{ marginLeft: "20%", marginBottom: 10}} onPress={onCalendar}>
                                    <Image
                                        style={
                                            {width: 35, height: 32}
                                        }
                                        source={require('../../img/date.png')}/>
                                </TouchableOpacity>
                                {calendar && (
                                    <Modal
                                        animationType="slide"
                                        transparent={false}
                                        visible={calendar}
                                        onRequestClose={onCalendar}
                                    >
                                        <Calendar
                                            value={deadLine}x
                                            onDayPress={(day)=>{
                                                handleDeadlineChange(day.dateString)
                                                console.log('찍힌 날짜',day.dateString)
                                                onCalendar(day.dateString);
                                                changeDeadLine(day.dateString)
                                            }}
                                        />
                                    </Modal>
                                )}
                                <View style={{margin: 10}}>
                                    <Text style={{fontSize: 15, marginLeft:17, color: "#51aef0"}}>
                                        버킷리스트 공개여부:
                                    </Text>
                                    <View style={{alignItems: 'flex-start', margin: 5, marginBottom: 0, marginLeft: 20}}>
                                        <CustomSwitch
                                            selectionMode={''}
                                            roundCorner={true}
                                            option1={'공개'}
                                            option2={'비공개'}
                                            onSelectSwitch={onSelectSwitch}
                                            selectionColor={"rgb(82,175,241)"}
                                        />
                                    </View>
                                </View>



                            </View>
                        </View>

                        <Text style={{...styles.text2, marginLeft: 17, marginBottom: -20}}>진행률:  {process} %</Text>
                        <BarView style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <Bar>
                                <ProgressBar
                                    process={process} // process 상태 변수 사용
                                    width={null}
                                    height={8}
                                    color='#F08484'
                                />
                            </Bar>
                            <BarText style ={{width: '15%', marginTop: 18}}>
                                100%
                            </BarText>
                        </BarView>

                        <View style={{alignSelf: 'flex-start', marginLeft: 10, marginTop : 20  ,width : '99%', maxHeight: "100%"}}>
                           <Text style={styles.text3}>STEP</Text>
                            <View>
                                {
                                    step.map((content, i ) => {
                                        return (
                                            <View style ={{marginTop : -15 }}>
                                                <View>
                                                    <View key={i} style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        <TextInput
                                                            value={step[i].content}
                                                            onChangeText={onChangeStep(i)}
                                                            style={{...styles.textInput, width:"60%"}}
                                                        />

                                                        <TouchableOpacity onPress={()=>{
                                                            console.log('삭제한다 : ', step[i].content)
                                                            DeleteStep(step[i].content)
                                                        }
                                                        }>
                                                            <Text style={{marginLeft:-10}}>지우기</Text>

                                                        </TouchableOpacity>
                                                        <CheckBox
                                                            style={{marginRight:20}}
                                                            isChecked={step[i].success}
                                                            onClick={() => {
                                                                // 체크 상태를 뒤집습니다
                                                                toggleSuccess(i,step[i].content)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>

                                        )
                                    })

                                }
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: -15}}>
                                <TouchableOpacity style={{alignContent: 'center', marginRight: 20}} onPress={() => {
                                    const newStep = { content: " ", success: false };
                                    changeStep([...step, newStep]);
                                }}>
                                    <Text style={styles.edittext}>과정 추가</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{alignContent: 'center'}} onPress={() => {
                                    addStep(step);
                                }}>
                                    <Text style={styles.edittext}>완료</Text>
                                </TouchableOpacity>
                            </View>
                        </View>



                            <View style={{alignSelf: 'flex-start', marginLeft: 10, marginTop : 35 }}>
                                <Text style={styles.text3}>HashTag</Text>
                                <View style={{ flexDirection: 'row', marginTop: 15}}>
                                    { //태그 출력
                                        tag.map((content, i ) =>{
                                            const tagContent = tag[i].content;
                                            return(
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            {
                                                                console.log('onPress')
                                                            }
                                                        }
                                                        } key={i}>

                                                            <View>
                                                                <TextInput
                                                                    value={tagContent}
                                                                    onChangeText={changeTagContent(i)}
                                                                    style={styles.text4}
                                                                    placeholder={"#"+tagContent}>
                                                                </TextInput >
                                                            </View>

                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }

                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: -15, marginTop: 5}}>
                                    <TouchableOpacity style={{alignContent: 'center', marginRight: 20}} onPress={() => {
                                        const newTag = {content: ""};
                                        changeTag([...tag, newTag]);
                                    }}>
                                        <Text style={styles.edittext2}>태그 추가</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{alignContent: 'center'}} onPress={() => {
                                        addTag(tag);
                                    }}>
                                        <Text style={styles.edittext2}>완료</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                ): (
                    <View style={{flexDirection: "column", margin: "3%",marginBottom: "11%"}}>
                        <View style={{...styles.storeCon, marginLeft: 30}}>
                            {modify ? <TouchableOpacity onPress={toggleEditing}>
                                <Text style={styles.buttonText2}>수정</Text>
                            </TouchableOpacity> : <Text style={styles.buttonText2}/>}
                        </View>
                        <ScrollView style={{height: "80%"}}>
                        <Text style={{...styles.Title,marginLeft:"20%",width: "60%", marginBottom: 1}}>" {title1} "</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: "10%", marginTop: 10}}>
                            <Image source={{ uri: bucketImage }} style={{ width: 160, height: 160, marginLeft: -10 }} />
                            <View style={{flex: 1}}>
                                <View style={{flexDirection: "row", width: 100, marginBottom: 5}}>
                                    <Text style={{...styles.text1, marginLeft: 20}}>기한: </Text>
                                    <Text style={{...styles.text1, marginLeft: -50, marginTop: 2}}>{deadLine}</Text>
                                </View>
                                <View style={{margin: 10}}>
                                    <Text style={{fontSize: 15, marginLeft:17,  color: "rgb(61,136,189)"}}>
                                        버킷리스트 공개여부:
                                    </Text>
                                    <Text style={{alignItems: 'flex-start', margin: 10, fontSize: 17, marginLeft: 20,color: "rgb(61,136,189)", fontWeight:'bold'}}>
                                        '{visibility}'</Text>
                                </View>


                            </View>
                        </View>

                            <Text style={{...styles.text2, marginLeft: 17, marginBottom: -20, marginTop: 5}}>진행률:  {process} %</Text>
                        <BarView style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <Bar>
                                <ProgressBar
                                    process={process}
                                    width={null}
                                    height={8}
                                    color='#F08484'
                                />
                            </Bar>
                            <BarText style ={{width: '15%', marginTop: 18}}>
                                100%
                            </BarText>
                        </BarView>

                            <View style={{alignSelf: 'flex-start', marginLeft: 10, marginTop : 20  ,width : '99%', maxHeight: "100%"}}>
                                <Text style={{...styles.text3, marginBottom:5}}>STEP</Text>
                            <View>
                                {
                                    step.map((content, i ) => {
                                        return (
                                            <View style ={{marginTop : -15 }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        {
                                                            console.log('onPress')
                                                        }
                                                    }
                                                    } key={i}>
                                                    <View key={i} style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        marginLeft: 10
                                                    }}>
                                                        <Text style={{...styles.textInput, width:"70%"}} >{step[i].content}</Text>

                                                        <CheckBox
                                                            style={{marginRight:40, marginTop: 5}}
                                                            isChecked={step[i].success}
                                                            disabled={true}
                                                        />

                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                            <View style={{alignSelf: 'flex-start', marginLeft: 10, marginTop : 35 }}>
                                <Text style={styles.text3}>HashTag</Text>
                                <View style={{ flexDirection: 'row', marginTop: 15}}>
                                    {
                                        tag.map((content, i ) =>{
                                            return(
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            {
                                                                console.log('onPress')
                                                            }
                                                        }
                                                        } key={i}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View>
                                                                <Text style={styles.text4}>#{tag[i].content}</Text>
                                                            </View>

                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )}
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
        backgroundColor: '#fdfdfe',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    storeCon:{
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'flex-end',
        width: '88%',
        marginLeft: 20,
    },
    navBox1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: '100%',
        padding: '5%',
        flexDirection: 'column', // Here, change 'row' to 'column'
    },
    Title:{
        width: "80%",
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 25,
        color: "black",

    },
    text1:{
        width: '100%',
        fontSize: 17,
        color: "black",
        padding: 5,
        marginLeft: 10,
    },
    text2:{
        width: '100%',
        fontSize: 17,
        color: '#265430',
        padding: 5,
        marginLeft: 10,
    },
    textInput: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        width: "60%",
        fontSize: 16,
        //borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    text3:{
        width: '100%',
        fontSize: 20,
        color: "black",
        fontWeight: 'bold',
    },
    text4:{
        width: '100%',
        fontSize: 17,
        color: '#51aef0',
        padding: 5,
        marginLeft: 10,
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
        width: 90,
        height: 90,
        resizeMode: "cover",
        borderRadius: 50,
        marginBottom: 30,
    },
    moreImg:{
        marginLeft: 5,
        marginRight: 30,
        width: 20,
        height: 20,
        resizeMode: "cover",
    },
    edittext:{
        width: '100%',
        fontSize: 15,
        color: "#fd007c",
        fontWeight: 'bold',
        marginLeft: 20,
    },
    edittext2:{
        width: '100%',
        fontSize: 15,
        color: "#fd007c",
        fontWeight: 'bold',
        marginLeft: 20,
    },

    buttonText:{
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
    },
    buttonText2:{
        textAlign: 'right',
        color: "#d0739c",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '7%'
    },
    buttonText3:{
        textAlign: 'right',
        color: "#d0739c",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '5%',
        marginLeft : '5%'
    },
    progressBar: {
        width: '100%',
        height: 15,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginTop: 20,
    },
    progress: {
        height: '100%',
        backgroundColor: '#4caf50',
        borderRadius: 10,
    },
    progressText: {
        marginTop: 10,
        fontSize: 20,
    },
});

export {BucketDetail}
