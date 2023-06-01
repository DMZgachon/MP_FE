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
import {Checkbox, ProgressBar} from 'react-native-paper';
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
import axios, {interceptors} from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {getAndReissueTokens} from "../../../api/reRefresh";
import {instance} from "../../../api/axiosInstance";
import {format} from "date-fns";
import {launchImageLibrary} from "react-native-image-picker";
import CustomSwitch from "./CustomSwitch";
import * as PropTypes from "prop-types";
import {Bar} from "react-native-progress";


function BarView(props) {
    return null;
}

BarView.propTypes = {
    style: PropTypes.shape({alignItems: PropTypes.string, flexDirection: PropTypes.string}),
    children: PropTypes.node
};

function BucketDetail(props) {
    const [bucketId, changeId] = useState()
    const [detail, setDetail] = useState({})
    const [listLoad, setListLoad] = useState([])
    const [tag, setTag] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const formData = new FormData();

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        setIsEditing(false);
        formData.append(detail.bucketImage);
        formData.append(detail.process);
        formData.append(detail.visibility);
        formData.append(detail.deadline);
        formData.append(detail.title);
        formData.append(detail.category);
        formData.append(detail.id);

        console.log("보내려는 데이터에 대하여: ", detail)

        instance.post(`/api/bucket/update/${detail.id}`, formData)
            .then((res) => {
                console.log("됐나?" , res.data)
            }).catch((err) => {console.log("응 안돼~: ", err)})

        // TODO: Save the changes via axios...

    }

    const onSelectSwitch = index => {
        alert(index + '공개 설정을 하였습니다. ');
    };

    useEffect(()=>{
        changeId(props.route.params.id);
        Promise.all([
            instance.get(`/api/bucket/bucketDetail/${props.route.params.id}`),
            instance.get(`/api/bucket/bucketListLoad/${props.route.params.id}`),
            instance.get(`/api/bucket/tagLoad/${props.route.params.id}`)
        ]).then((res)=>{
            console.log("bucketDetail:" ,res[0].data.data)
            setDetail(res[0].data.data)
            console.log("bucketListLoad:" ,res[1].data.data)
            setListLoad(res[1].data.data)
            console.log("tagLoad:" ,res[2].data.data)
            setTag(res[2].data.data)

        }).catch((err)=>{

        })
    },[])

    return(
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>

            {!isEditing ? (
                <View>
                    <TouchableOpacity onPress={handleEdit}>
                        <Text style={styles.buttonText2}>수정</Text>
                    </TouchableOpacity>

                    <View>
                        <Text style={{...styles.Title, marginTop: -10}}>" {detail.title} "</Text>
                        <Image source={{ uri: detail.bucketImage }} style={{ width: 180, height: 180 }} />

                        <View style={{flexDirection: "column", width: 100, marginTop: -70}}>
                            <Text style={{...styles.text1, marginLeft: 10}}>기한: </Text>
                            <Text style={{...styles.text1, marginTop: -10, marginLeft: 10, width: 200}}>{detail.deadline}</Text>
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

                        <Text style={{...styles.text2,marginLeft: 17}}>진행률:  {detail.progress} %</Text>
                        <BarView style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Bar>
                                <ProgressBar
                                    progress={detail.progress}
                                    width={null}
                                    height={8}
                                    color='#F08484'
                                />
                            </Bar>

                        </BarView>
                    </View>

                </View>

            ) : (
                <View>
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.buttonText2}>수정완료</Text>
                    </TouchableOpacity>

                    <View>
                        <TextInput style={{...styles.Title, marginTop: -10}}
                        onChangeText={text => {
                            setDetail(prevState => ({
                                bucket: {
                                    ...detail,
                                    title: text
                                }
                            }))
                        }}>" {detail.title} "</TextInput>
                        <Image source={{ uri: detail.bucketImage }} style={{ width: 180, height: 180 }} />

                        <View style={{flexDirection: "column", width: 100, marginTop: -70}}>
                            <Text style={{...styles.text1, marginLeft: 10}}>기한: </Text>
                            <TextInput style={{...styles.text1, marginTop: -10, marginLeft: 10, width: 200}}
                            onChangeText={text => {
                                setDetail(prevState => ({
                                    bucket: {
                                        ...detail,
                                        deadline: text
                                    }
                                }))
                            }}>{detail.deadline}</TextInput>
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

                        <Text style={{...styles.text2,marginLeft: 17}}>진행률:  {detail.progress} %</Text>
                        <BarView style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Bar>
                                <ProgressBar
                                    progress={detail.progress}
                                    width={null}
                                    height={8}
                                    color='#F08484'
                                />
                            </Bar>

                        </BarView>
                    </View>

                </View>
            )}



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