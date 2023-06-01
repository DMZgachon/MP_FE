import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    Image,
    View,
    Button, Modal,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Calendar } from "react-native-calendars";
import {Footer} from "../Layout/footer";
import {Header} from '../Layout/Header'
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {getAndReissueTokens} from "../../../api/reRefresh";
import {instance} from "../../../api/axiosInstance";
import styled from "styled-components/native";
import CustomSwitch from "./CustomSwitch";
import {format} from "date-fns";
import ImagePicker from "react-native-image-picker";
import {launchImageLibrary} from "react-native-image-picker";

//https://joylee-developer.tistory.com/161
const ProgressBar = ({progress}) => {
    const barWidth = progress > 100 ? 100 : (progress < 0 ? 0 : progress);
    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${barWidth}%` }]} />
            </View>
        </View>
    );
};

function BucketDetail(props) {
    const [bucketImage, changeImage] = useState(null);
    const [deadLine, changeDeadLine] = useState("");
    const [progress, changeProcess] = useState(0);
    const [title1, changeTitle] = useState("");
    const [tag, changeTag] = useState(["default"]);
    const [step, changeStep] = useState(["default"]);

    const [imageData, setImageData] = useState(null);
    const [calendar, setCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), "yyyy-MM-dd"),
    );
    const [isEditing, setIsEditing] = useState(false);
    const [stepCheckStatus, setStepCheckStatus] = useState(step.map(() => false));
    const [checked, setChecked] = React.useState(false);
    const formdata = new FormData();

    const CancelToken = axios.CancelToken;
    let cancel;
    const [bucketId, changeId] = useState();
    const onCalendar = () => {
        setCalendar(!calendar)
    }
    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        setIsEditing(false);

        // TODO: Save the changes via axios...

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

            }).catch((error) => {
                console.log('bucket 오류');
            });


            getAndReissueTokens(cancel).then(r => console.log('getAndReissueTokens'));
            return () => {
                console.log('Screen was unfocused');
                if (cancel !== undefined) cancel();
            };
        }, [])
    );

    useEffect(() => {

    })
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
    const onSelectSwitch = index => {
        alert(index + '공개 설정을 하였습니다. ');
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

    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>
            <View style={styles.navBox1}>
                <View style={styles.storeCon}>
                    {!isEditing ? (
                        <TouchableOpacity onPress={handleEdit}>
                            <Text style={styles.buttonText2}>수정</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleSave}>
                            <Text style={styles.buttonText2}>수정완료</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ScrollView style={{width: '100%'}}>
                    {isEditing ? (
                        <TextInput
                            value={title1}
                            onChangeText={text => changeTitle(text)}
                            style={{...styles.textInput, margin: 80}}
                        />
                    ) : (
                        <Text style={{...styles.Title, marginTop: -10}}>" {title1} "</Text>
                    )}
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                        {isEditing ? (
                            <TouchableOpacity onPress={() => ShowPicker()}>
                                <Image source={{ uri: bucketImage }} style={{ width: 180, height: 180 }} />
                            </TouchableOpacity>
                        ) : (
                            <Image source={{ uri: bucketImage }} style={{ width: 180, height: 180 }} />
                        )}

                        <View>

                            {isEditing ? (
                                    <View style={{flexDirection: "column"}}>
                                        {/*<TextInput*/}
                                        {/*    value={deadLine}*/}
                                        {/*    onChangeText={text => changeDeadLine(text)}*/}
                                        {/*    style={{...styles.textInput, marginLeft: 15, marginTop: 5}}*/}
                                        {/*/>*/}
                                        <View style={{flexDirection: "row", width: 100, marginBottom: 5}}>
                                            <Text style={{...styles.text1, marginLeft: 10}}>기한: </Text>
                                            <Text style={{...styles.text1, marginLeft: -50}}>{selectedDate}</Text>
                                        </View>
                                        <TouchableOpacity style={{ marginLeft: "20%", marginBottom: 70}} onPress={onCalendar}>
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
                                                    onDayPress={(day)=>{
                                                        setSelectedDate(day.dateString)
                                                        onCalendar()
                                                    }}
                                                />
                                            </Modal>
                                        )}
                                    </View>


                            ) : (
                                <View style={{flexDirection: "column", width: 100, marginTop: -70}}>
                                    <Text style={{...styles.text1, marginLeft: 10}}>기한: </Text>
                                    <Text style={{...styles.text1, marginTop: -10, marginLeft: 10, width: 200}}>{deadLine}</Text>
                                </View>
                            )}
                        </View>
                            <View style={{ marginTop: 90, marginLeft: -85}}>
                                <Text style={{fontSize: 15,  color: "rgb(61,136,189)"}}>
                                    버킷리스트 공개여부:
                                </Text>
                                <View style={{alignItems: 'flex-start'}}>
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
                    <Text style={{...styles.text2,marginLeft: 17}}>진행률:  {progress} %</Text>
                    <BarView style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Bar>
                            <ProgressBar
                                progress={progress}
                                width={null}
                                height={8}
                                color='#F08484'
                            />
                        </Bar>
                        <BarText style ={{width: '15%',}}>
                            100%
                        </BarText>
                    </BarView>
                    <Text style={{...styles.text1, marginLeft: 17, fontWeight: 'bold', marginTop: 15, marginBottom: -10}}>STEP </Text>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignSelf: 'flex-start', marginLeft: 25 }}>
                        <View>
                            {
                                step.map((content, i ) => {
                                    return (
                                        <View key={i} style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            {isEditing ? (
                                            <TextInput
                                                value={step[i].content}
                                                onChangeText={text => changeStep(text)}
                                                style={{...styles.textInput, width:"75%"}}
                                            />
                                        ) : (
                                            <Text style={{...styles.steptext}}>{i + 1}. {step[i].content}</Text>
                                        )}
                                            <TouchableOpacity onPress={() => {
                                                // 체크 상태를 뒤집습니다
                                                const newStepCheckStatus = [...stepCheckStatus];
                                                newStepCheckStatus[i] = !newStepCheckStatus[i];
                                                setStepCheckStatus(newStepCheckStatus);
                                            }}>
                                                <CheckBox
                                                    isChecked={stepCheckStatus[i]}
                                                    onClick={() => {
                                                        // 체크 상태를 뒤집습니다
                                                        const newStepCheckStatus = [...stepCheckStatus];
                                                        newStepCheckStatus[i] = !newStepCheckStatus[i];
                                                        setStepCheckStatus(newStepCheckStatus);
                                                    }}
                                                />
                                            </TouchableOpacity>

                                        </View>
                                    )
                                })
                            }
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.steptext}>* 체크박스 저장 *</Text>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />

                        </View>
                    </View>
                    <View style={{flex: 1, marginTop: 20}}></View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: 14 , felx: 1}}>
                        {
                            tag.map((content, i) => {
                               return (
                                   <TouchableOpacity
                                        onPress={() => {
                                            {
                                                console.log('onPress')
                                            }
                                        }
                                        } key={i}>
                                        <View style={{ alignItems: 'center', }}>
                                            {isEditing ? (
                                                <TextInput
                                                    value={tag[i].content}
                                                    onChangeText={text => changeTag(text)}
                                                    style={{...styles.textInput, width:"90%", marginLeft: 30 }}
                                                />
                                            ) : (
                                                <Text style={{...styles.tagtext}}>#{tag[i].content}</Text>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
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
        height: '85%',
        padding: '5%',
        flexDirection: 'column', // Here, change 'row' to 'column'
    },
    Title:{
        width: "100%",
        textAlign: "center",
        fontSize: 25,
        color: "black",

    },
    text1:{
        width: '100%',
        fontSize: 17,
        color: "black",
        padding: 5,
    },
    text2:{
        width: '100%',
        fontSize: 15,
        color: "black",
        padding: 5,
        marginBottom: -20,
        fontWeight: 'bold'
    },
    tagtext:{
        width: '100%',
        fontSize: 17,
        color: '#515156',
        padding: 5,
        marginLeft: 10,
    },
    steptext:{
        fontSize: 17,
        color: 'black',
        padding: 5,
        marginLeft: 10,
        borderBottomWidth: 1,
        width: 280,
        borderStyle: 'solid',
        borderColor: '#F08484',
        justifyContent: 'center',
        margin:"3%"
    },

    textInput: {
        marginTop: 20,
        marginBottom: 10,
        height: 40,
        width: "60%",
        fontSize: 16,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#f1b2b2',
    },
    progressBar: {
        width: '100%',
        height: 15,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    progress: {
        height: '100%',
        backgroundColor: '#ec8ba5',
        borderRadius: 10,
    },
    progressText: {
        marginTop: 10,
        fontSize: 20,
    },
    buttonText2:{
        textAlign: 'right',
        color: '#ec8ba5',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: -10,
        marginTop: -10,
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

export {BucketDetail}
