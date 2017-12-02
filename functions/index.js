const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.fcmSend = functions.database.ref('/messages/{userId}/{messageId}').onCreate(event => {
    const message = event.data.val()
    const userId  = event.params.userId
    const payload = {
        notification: {
            title: message.title,
            body: message.body,
            icon: "https://placeimg.com/250/250/people"
        }
        };
    admin.database()
        .ref(`/fcmTokens/${userId}`)
        .once('value')
        .then(token => token.val() )
        .then(userFcmToken => {
            return admin.messaging().sendToDevice(userFcmToken, payload)
        })
        .then(res => {
            console.log("Sent Successfully", res);
        })
        .catch(err => {
            console.log(err);
        });
});

exports.fcmSendToAll = functions.database.ref('/mensajesATodos/{messageId}').onCreate(event => {
    const message = event.data.val();
    const userId  = event.params.userId;
    console.log("eventdata:" + message);
    console.log("userId:" + userId);
    const dest = message.receptor;
	console.log("dest:" + dest);
    const payload = {
        notification: {
            title: message.from,
            body: message.message,
            icon: "https://placeimg.com/250/250/people"
        }
    };
    admin.database()
        .ref(`/fcmTokens/${dest}`)
        .once('value')
        .then(token => token.val())
        .then(userFcmToken => {
        	console.log("userFcmToken:" + userFcmToken);
        	console.log("dest:" + dest);
            return admin.messaging().sendToDevice(userFcmToken, payload)
        })
        .then(res => {
            console.log("Sent Successfully", res);
        })
        .catch(err => {
            console.log(err);
        });
});

exports.fcmSendToSpecific = functions.database.ref('/mensajesAUno/{messageId}').onCreate(event => {
    const message = event.data.val();
    const userId  = event.params.userId;
    console.log("eventdata:" + message);
    console.log("userId:" + userId);
    const dest = message.receptor;
	console.log("dest:" + dest);
    const payload = {
        notification: {
            title: message.from,
            body: message.message,
            icon: "https://placeimg.com/250/250/people"
        }
    };
    admin.database()
        .ref(`/fcmTokens/${dest}`)
        .once('value')
        .then(token => token.val())
        .then(userFcmToken => {
        	console.log("userFcmToken:" + userFcmToken);
        	console.log("dest:" + dest);
            return admin.messaging().sendToDevice(userFcmToken, payload)
        })
        .then(res => {
            console.log("Sent Successfully", res);
        })
        .catch(err => {
            console.log(err);
        });
});

exports.avisarFaltas = functions.database.ref('/avisoFaltas/{messageId}').onCreate(event => {
    const message = event.data.val();
    const userId  = event.params.userId;
    console.log("eventdata:" + message);
    console.log("userId:" + userId);
    const dest = message.receptor;
	console.log("dest:" + dest);
    const payload = {
        notification: {
            title: message.from,
            body: message.message,
            icon: "https://placeimg.com/250/250/people"
        }
    };
    admin.database()
        .ref(`/fcmTokens/${dest}`)
        .once('value')
        .then(token => token.val())
        .then(userFcmToken => {
        	console.log("userFcmToken:" + userFcmToken);
        	console.log("dest:" + dest);
            return admin.messaging().sendToDevice(userFcmToken, payload)
        })
        .then(res => {
            console.log("Sent Successfully", res);
        })
        .catch(err => {
            console.log(err);
        });
});