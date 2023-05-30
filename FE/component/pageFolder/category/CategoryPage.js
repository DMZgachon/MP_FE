import React, {useState} from 'react';
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

function CategoryPage(props){
    const CancelToken = axios.CancelToken;
    let cancel;
    const [bucket_image, changeimage] = useState([])
    const [bucket_title, changetitle] = useState([])
    const [bucketid, changeId] = useState(0)

    const [listlist, changeList] = useState([])

    useFocusEffect(
        React.useCallback(() => {
            console.log('Screen was focused');
            instance
                .get(`/api/bucket/load/${id}`)
                .then(async (response) => {
                    changeList(response)
                    const parsedResponse = JSON.parse(response.request._response);
                    const bucketImageList = parsedResponse.data.map(item => item.bucketImage);
                    const bucketIdlist = parsedResponse.data.map(item => item.id);
                    changeId(bucketIdlist)
                    changeimage(bucketImageList)

                    const bucketTitle = parsedResponse.data.map(item => item.title);
                    console.log(bucketTitle);
                    changetitle(bucketTitle)
                })
                .catch((error) => {
                    console.log('버킷 발급 실패');
                });

            getAndReissueTokens(cancel).then(r => console.log('getAndReissueTokens'));

            return () => {
                console.log('Screen was unfocused');
                if (cancel !== undefined) cancel();
            };
        }, [])
    );


    const id = props.route.params.data[2]
    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.name}></Header>
            </View>

            <View style ={{ width : '2000%', height : '70%', alignItems : 'center', margin : 3}}>
                <ScrollView>
                    {
                        bucket_image.map((content, i ) =>{
                            return(
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate('BucketDetail',{data : bucket_title[i], id : bucketid[i]})
                                            {
                                                console.log(props.route.params.data)
                                            }
                                        }
                                        } key={i}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
                                                <Text >{bucket_title[i]}</Text>
                                            </View>
                                            <Image
                                                style={{
                                                    width: 130,
                                                    height: 220,
                                                    borderColor: 'blue',
                                                    marginRight : 5,
                                                    marginBottom: 10, // 이미지 간격 조절
                                                    flexDirection : 'row',
                                                    borderRadius : 10,
                                                    marginTop : 20
                                                }}
                                                source={{uri : content}}
                                            />
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

export {CategoryPage}