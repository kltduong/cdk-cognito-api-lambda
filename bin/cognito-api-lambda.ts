#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CognitoApiLambdaStack } from '../lib/cognito-api-lambda-stack';

const app = new cdk.App();
new CognitoApiLambdaStack(app, 'CognitoApiLambdaStack');
