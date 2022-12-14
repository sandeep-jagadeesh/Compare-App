const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    const params = {
        Key: {
            "UserId": {
                S: event.user
            }
        },
        TableName: "compare-yourself"
    };
    dynamodb.deleteItem(params, function(err, data){
        if(err){
            console.log(err);
            callback(err);
        }else{
            console.log(data);
            callback(null, data);
        }
    });
};
