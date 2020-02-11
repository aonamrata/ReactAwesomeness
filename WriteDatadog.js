import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

const PUSH_ENDPOINT = 'https://http-intake.logs.datadoghq.com/v1/input/xxx';


export default async function writeToDatadog(message) {

    console.log("writeToDatadog starting");
    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    let deviceToken2 = '';
    if (Constants.appOwnership == 'standalone')
        deviceToken2 = await Notifications.getDevicePushTokenAsync({ gcmSenderId: "reactexpoapp" });


    // POST the token to your backend server from where you can retrieve it to send push notifications.
    fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "title": `Expo Mobile message from device = ${Device.deviceName}`,
            "message": message,
            "expoToken": token,
            "deviceToken": deviceToken2,
            "installationId": Constants.installationId,
            "deviceName": Device.deviceName,
            "deviceId": Constants.deviceId,
            "osName": Constants.osName,
            "osVersion": Constants.osVersion,
            "priority": "normal",
            "tags": ["environment:react-expo-app"],
            "alert_type": "info",
            "user": {
                "username": Constants.deviceName,
            },
        }),
    });
    return;
}