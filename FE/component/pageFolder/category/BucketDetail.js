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
                changeDeadLine(responses[0].data.data.deadline)
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

            }).catch((error) => {
                console.log('bucket 오류');
            });


            getAndReissueTokens(cancel).then(r => console.log('getAndReissueTokens'), fetchTokenAndSet());
            return () => {
                console.log('Screen was unfocused');
                if (cancel !== undefined) cancel();
            };
        }, [])
    );

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
                    console.error('No image data');
                }
            } catch (error) {
                console.error('Error in creating Blob: ', error);
            }

            formData.append('visibility', visibility);
            formData.append('category', category);
            formData.append('title', title1);
            formData.append('deadline', deadLine);
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


    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>

            <View style={{height: "100%", overflow: 'visible'}} nestedScrollEnabled={true} scrollEnabled={true}>
                { isEditing ? (
                    <View style={{flexDirection: "column", margin: "3%"}}>
                        <View style={styles.storeCon}>
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
                        <TextInput style={{...styles.Title, marginTop: 0}} onChangeText={handleTextChange}
                                   value={title1} placeholder={title1}></TextInput>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
                            <TouchableOpacity onPress={ShowPicker}>
                                <Image
                                    style={{width: 160, height: 160}}
                                    source={bucketImage ? {uri: bucketImage} : require('../../img/PlusImg.png')}
                                />
                            </TouchableOpacity>


                            <View style={{flex: 1}}>
                                <Text style={styles.text1}>기한: </Text>
                                <TextInput style={styles.text1} onChangeText={handleDeadlineChange} value={deadLine} placeholder={deadLine}></TextInput>
                                <View style={{margin: 10}}>
                                    <Text style={{fontSize: 15,  color: "rgb(61,136,189)"}}>
                                        버킷리스트 공개여부:
                                    </Text>
                                    <View style={{alignItems: 'flex-start', margin: 10}}>
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

                                <View>
                                    <View>
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
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <View>
                                                                    <TextInput
                                                                        value={tagContent}
                                                                        onChangeText={changeTagContent(i)}
                                                                        style={styles.text2}
                                                                        placeholder={"#"+tagContent}>
                                                                    </TextInput >
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }
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
                            <BarText style ={{width: '15%',}}>
                                100%
                            </BarText>
                        </BarView>

                        <ScrollView style={{alignSelf: 'flex-start', marginLeft: 25, marginTop : 10  ,width : '99%'}}>
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
                                                            <Text>Delete</Text>

                                                        </TouchableOpacity>
                                                        <CheckBox
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

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={{alignContent: 'center', marginRight: 20}} onPress={() => {
                                    const newStep = { content: " ", success: false };
                                    changeStep([...step, newStep]);
                                }}>
                                    <Text>과정 추가</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{alignContent: 'center'}} onPress={() => {
                                    addStep(step);
                                }}>
                                    <Text>완료</Text>
                                </TouchableOpacity>
                            </View>




                        </ScrollView>
                    </View>
                ): (
                    <View style={{flexDirection: "column", margin: "3%"}}>
                        <View style={styles.storeCon}>
                            <TouchableOpacity onPress={toggleEditing}>
                                <Text style={styles.buttonText2}>수정</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{...styles.Title, marginTop: 0}}>" {title1} "</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
                            <Image source={{ uri: bucketImage }} style={{ width: 180, height: 180 }} />
                            <View style={{flex: 1}}>
                                <Text style={styles.text1}>기한: </Text>
                                <Text style={styles.text1}>{deadLine}</Text>

                                <View style={{margin: 10}}>
                                    <Text style={{fontSize: 15,  color: "rgb(61,136,189)"}}>
                                        버킷리스트 공개여부:
                                    </Text>
                                    <View style={{alignItems: 'flex-start', margin: 10}}>
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

                                <View>
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
                                                                <Text style={styles.text2}>#{tag[i].content}</Text>
                                                            </View>

                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </View>

                        <Text style={{...styles.text2, marginLeft: 17, marginBottom: -20}}>진행률:  {process} %</Text>
                        <BarView style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <Bar>
                                <ProgressBar
                                    process={process}
                                    width={null}
                                    height={8}
                                    color='#F08484'
                                />
                            </Bar>
                            <BarText style ={{width: '15%',}}>
                                100%
                            </BarText>
                        </BarView>

                        <ScrollView style={{alignSelf: 'flex-start', marginLeft: 25, marginTop : 20 , width : '99%'}}>
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
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        <Text style={{...styles.textInput, width:"75%"}} >{step[i].content}</Text>

                                                        <CheckBox
                                                            isChecked={step[i].success}
                                                            onClick={() => {
                                                                // 체크 상태를 뒤집습니다
                                                                toggleSuccess(i)
                                                            }}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })

                                }
                            </View>
                        </ScrollView>
                    </View>
                )}
            </View
            >


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
        color: "black"
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
        color: '#5296e3',
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
    editbtn:{
        marginBottom: 10,
        width: 250,
        borderRadius: 40,
        height: "8%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#dfeffd"
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
        marginTop: '5%'
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
        height: 20,
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
