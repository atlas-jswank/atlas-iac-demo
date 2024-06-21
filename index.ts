import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";
import Handler from "./api/handler";

// A Lambda function to invoke
const fn = new aws.lambda.CallbackFunction("fn", {
  callback: Handler,
});

// A REST API to route requests to HTML content and the Lambda function
const api = new apigateway.RestAPI("api", {
  routes: [
    { path: "/", localPath: "ui/dist" },
    { path: "/date", method: "GET", eventHandler: fn },
  ],
});

// The URL at which the REST API will be served.
export const url = api.url;
