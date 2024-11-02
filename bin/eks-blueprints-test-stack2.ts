#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { buildInfra } from '../lib/eks-blueprints-test-stack';
import { KubernetesVersion } from 'aws-cdk-lib/aws-eks';
import * as blueprints from "@aws-quickstart/eks-blueprints";

const app = new cdk.App();
const version = app.node.tryGetContext('kubeVersion') || '1.31';
const stackName = app.node.tryGetContext('stackName') || 'eks-blueprint-test';

const kubeVersion = KubernetesVersion.of(version);
const account = app.account as string;
const region = process.env.CDK_DEFAULT_REGION || 'us-west-1';

const builder = buildInfra(kubeVersion, account, region);

const addOns: Array<blueprints.ClusterAddOn> = [
  new blueprints.addons.SSMAgentAddOn(),
  new blueprints.addons.ExternalsSecretsAddOn(),
  new blueprints.addons.SecretsStoreAddOn(),

];
builder.build(app, stackName);
