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
    Button,
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


    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>



            <Text>{title1}</Text>


            <Text>{deadLine}</Text>

            <Image source={{ uri: bucektImage }} style={{ width: 200, height: 200 }} />


            <View style ={{ width : '2000%', height : '70%', alignItems : 'center', margin : 3}}>
                <ScrollView>
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
                                                <Text >{tag[i].content}</Text>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </ScrollView>
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