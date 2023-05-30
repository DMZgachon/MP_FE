import React, {useEffect, useState} from 'react';
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
    Button, Modal,
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

function BucketDetail(props){
    const [bucektImage, changeImage] = useState("");
    const [deadLine, changeDeadLine] = useState();
    const [progress, changeProcess] = useState();
    const [title1, changeTitle] = useState();
    const [tag, changeTag] = useState([]);
    const [step, changeStep] = useState([]);



    const CancelToken = axios.CancelToken;
    let cancel;
    const [bucketId, changeId] = useState();

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

    useEffect(()=>{

    })
    const ProgressBar = ({progress}) => {

        const barWidth = progress > 100 ? 100 : (progress < 0 ? 0 : progress);

        return (
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    <View style={[styles.progress, { width: `${barWidth}%` }]} />
                </View>
                <Text style={styles.progressText}>
                    {progress}%
                </Text>
            </View>
        );
    };

    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>
            <View style={styles.navBox1}>
                <View style={styles.storeCon}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('', {data : ''})}}>
                        <Text style={styles.buttonText2}>저장</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{...styles.Title, marginTop: 0}}>" {title1} "</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
                    <Image source={{ uri: bucektImage }} style={{ width: 180, height: 180 }} />
                    <View style={{flex: 1}}>
                        <Text style={styles.text1}>기한: </Text>
                        <Text style={styles.text1}>{deadLine}</Text>
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
