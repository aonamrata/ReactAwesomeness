import { Notifications } from 'expo';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

const PUSH_ENDPOINT = 'https://http-intake.logs.datadoghq.com/v1/input/xxx';


export default async function handlePushNotification(notification) {

    let deviceToken2 = await Notifications.getDevicePushTokenAsync({ gcmSenderId: "reactexpoapp" });
    console.log("In handlePushNotification");
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "title": `Expo Mobile Push message recieved`,
            "notification": notification,
            "deviceToken": deviceToken2,
            "installationId": Constants.installationId,
            "deviceName": Device.deviceName,
            "deviceId": Constants.deviceId,
            "osName": Constants.osName,
            "osVersion": Constants.osVersion,
            "priority": "normal",
            "tags": ["environment:demo-mobile-app"],
            "alert_type": "info",
            "user": {
                "username": Constants.deviceName,
            },
        }),
    });

    return;
}