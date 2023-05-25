// refreshToken.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {instance, setAccessTokenHeader} from "../api/axiosInstance";

export const getAccess = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken')
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        console.log('IN getAccess method access : ', accessToken)
        console.log('IN getAccess method access : ', refreshToken)

        return { accessToken, refreshToken };
    } catch (error) {
        // handle the error
        console.log(error);
    }
}

export const getAndReissueTokens = async (cancel) => {
    const { accessToken, refreshToken } = await getAccess();

    // Cancel the previous request before making a new request
    if (cancel !== undefined) cancel();

    instance
        .post('/api/auth/reissue', {
            accessToken: accessToken,
            refreshToken: refreshToken
        })
        .then(async (response) => {
            await AsyncStorage.setItem('accessToken', response.data.data.accessToken);
            await AsyncStorage.setItem('refreshToken', response.data.data.refreshToken);
            setAccessTokenHeader(response.data.data.accessToken)
            console.log(response.data);
        })
        .catch((error) => {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                // handle the error
                console.log(error);
            }
        });
}
