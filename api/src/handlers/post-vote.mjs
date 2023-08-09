import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { voteSchema } from "../schema/schema.mjs";

const QueueUrl = process.env.QUEUE_URL;
const sqsClient = new SQSClient({ region: "ca-central-1" });

export const postVoteHandler = async (event, context, callback) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }

  console.info("postVoteHandler received:", event);
  const body = JSON.parse(event.body);

  try {
    await voteSchema.validate (body);
  } catch (err) {
    const response = {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "400: Bad request",
        message: err.message,
      }),
    };

    return response;
  }

  try {
    const queueParams = {
      QueueUrl,
      MessageBody: JSON.stringify(body),
    };

    const message = await sqsClient.send(new SendMessageCommand(queueParams));
    console.info("postVoteHandler - message sent to sqs", message);
  } catch (err) {
    console.log("postVoteHandler error - ", err.message);
  }

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
    },
    body: JSON.stringify(body),
  };

  // All log statements are written to CloudWatch
  console.info(
    `postVoteHandler response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
