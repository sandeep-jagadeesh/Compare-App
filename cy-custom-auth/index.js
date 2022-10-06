exports.handler = (event, context, callback) => {
    const token = event.authorizationToken;
    //use token
    if(token === 'allow'){
        const policy = generatePolicy('allow', event.methodArn); //methodArn might be the resource, auth token, type, object
        const principalId = 'khss7%7y'; //hardcoded from DynamoDB
        const context = {
            simpleAuth: true
        };
        const response = {
            principalId: principalId,
            policyDocument: policy,
            context: context
        };
        callback(null, response);
    }else if(token == 'deny'){
        const policy = generatePolicy('deny', event.methodArn); //methodArn might be the resource, auth token, type, object
        const principalId = 'khss7%7y';
        const context = {
            simpleAuth: true
        };
        const response = {
            principalId: principalId,
            policyDocument: policy,
            context: context
        };
        callback(null, response);
    }else{
        callback('Unauthorized');
    }
    
};

//function is created based on the AWS policy reference of other policy attached
function generatePolicy(effect, resource){
    const policy = {};
    policy.Version = "2012-10-17";
    policy.Statement = [];
    const statement = {};
    statement.Action = 'execute-api:Invoke';
    statement.Effect = effect;
    statement.Resource = resource;
    policy.Statement.push(statement);
    return policy;
}