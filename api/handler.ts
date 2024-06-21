import {
  Callback,
  CallbackFunctionArgs,
  Context,
  EventHandler,
} from "@pulumi/aws/lambda";

export default async (
  event: any,
  context: Context
): Promise<{ statusCode: number; body: string }> => {
  return {
    statusCode: 200,
    body: "Hello " + new Date().toISOString(),
  };
};
