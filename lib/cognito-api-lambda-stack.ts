import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as path from 'path';


const getLambdaPaths = function(lambda_name: String) {
  const codePath = path.resolve(
    __dirname,
    `../src/lambda/${lambda_name}`
  )
  const envPath = path.resolve(
    __dirname,
    `../python_modules/lambda/${lambda_name}`
  )
  return { codePath, envPath }
}

export class CognitoApiLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let { codePath } = getLambdaPaths('hlo');
    const hloLambda = new lambda.Function(this, 'hloFunction', {
      code: new lambda.AssetCode(codePath),
      handler: 'main.handler',
      runtime: lambda.Runtime.PYTHON_3_8,
    });
    
    const hloApi = new apigateway.LambdaRestApi(this, 'hloApi', {
      restApiName: "HLO Service",
      handler:hloLambda,
      proxy: false,
    })
    
    const hloResource = hloApi.root.addResource('hlo');
    const hloIntegration = new apigateway.LambdaIntegration(hloLambda);
    hloResource.addMethod('GET', hloIntegration)
  }
}
