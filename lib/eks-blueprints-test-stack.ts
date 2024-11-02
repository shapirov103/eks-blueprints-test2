import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as blueprints from "@aws-quickstart/eks-blueprints";
import { KubernetesVersion } from "aws-cdk-lib/aws-eks";

export function buildInfra(kubeVersion: KubernetesVersion, account: string, region: string): blueprints.BlueprintBuilder {
  return blueprints.EksBlueprint.builder()
    .version(kubeVersion)
    .account(account)
    .region(region)
}

export class EksBlueprintsTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const version = this.node.tryGetContext('kubeVersion') || '1.31';
    const stackName = this.node.tryGetContext('stackName') || 'eks-blueprint-test';
    const bucketName = this.node.tryGetContext('bucketName') || 'my-test-bucket';

    const addOns: Array<blueprints.ClusterAddOn> = [
      new blueprints.addons.ArgoCDAddOn(),
      new blueprints.addons.ClusterAutoScalerAddOn(),
      new blueprints.addons.S3CSIDriverAddOn({ s3BucketName: bucketName }),
    ];

    const kubeVersion = KubernetesVersion.of(version);
    const stack = buildInfra(kubeVersion, this.account, this.region)
      .resourceProvider(
        "s3-bucket",
        new blueprints.CreateS3BucketProvider({
          name: bucketName,
          id: bucketName,
          s3BucketProps: {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
          }
        })
      )
      .addOns(...addOns)
      .build(scope, stackName);
  }
}
