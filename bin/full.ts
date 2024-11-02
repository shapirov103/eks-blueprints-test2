#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { buildInfra } from '../lib/eks-blueprints-test-stack';

import * as blueprints from "@aws-quickstart/eks-blueprints";

const app = new cdk.App();

const stackName = app.node.tryGetContext('stackName') || 'eks-blueprint-test';

const addOns: Array<blueprints.ClusterAddOn> = [
    new blueprints.addons.SSMAgentAddOn(),
    new blueprints.addons.ExternalsSecretsAddOn(),
    new blueprints.addons.SecretsStoreAddOn(),

];

buildInfra(app).
    addOns(...addOns).
    build(app, stackName);
