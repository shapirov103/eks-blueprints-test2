#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { buildInfra } from '../lib/eks-blueprints-test-stack';

const app = new cdk.App();


const stackName = app.node.tryGetContext('stackName') || 'eks-blueprint-test';

buildInfra(app).build(app, stackName);