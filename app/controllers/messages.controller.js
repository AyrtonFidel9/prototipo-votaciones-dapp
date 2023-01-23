import * as dotenv from 'dotenv';
import AWS from 'aws-sdk';
import twilio from "twilio";
dotenv.config();





function sendMessageController(message, number, subject) {

    number = number.slice(1);
    // AWS.config.update({ region: process.env.AWS_REGION });

    // var params = {
    //     Message: message,
    //     PhoneNumber: '+593' + number,
    //     MessageAttributes: {
    //         'AWS.SNS.SMS.SenderID': {
    //             'DataType': 'String',
    //             'StringValue': subject
    //         }
    //     }
    // };

    // const publishTextPromise = new AWS.SNS(
    //     { apiVersion: '2010-03-31' })
    //     .publish(params).promise();

    // publishTextPromise.then(function (data) {
    //     console.log(data);
    //     //res.end(JSON.stringify({ MessageID: data.MessageId }));
    // })
    // .catch(function (err) {
    //     console.error(err);
    //     //res.end(JSON.stringify({ Error: err }));
    // });
    const account = process.env.ACCOUNT_SID_TWILIO;
    const token = process.env.ACCOUNT_AUTH_TOKEN_TWILIO;
    
    const client = twilio(account, token);

    client.messages.create({
        to: '+593'+number,
        from: process.env.TWILIO_NUMBER,
        body: message
    }).then((mesg) => console.log(mesg));
}
export default Object.freeze({
    sendMessage: sendMessageController,
});
