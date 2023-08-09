import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { pollSchema } from "../schema/schema.mjs";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME;

export const createPollHandler = async (event, context, callback) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `createPollHandler only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }

  console.info("createPollHandler received:", event);

  // { question: 'string', options: ['string']}
  const body = JSON.parse(event.body);

  try {
    await pollSchema.validate(body);
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

  const pollId = `${Math.floor(1000 + Math.random() * 9000)}`;
  const { question, options } = body;

  try {
    const initialResult = options.reduce(
      (acc, cur) => ({ ...acc, [cur]: 0 }),
      {}
    );

    const command = new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: tableName,
            Item: { id: `POLL#${pollId}`, ...body },
          },
        },
        {
          Put: {
            TableName: tableName,
            Item: {
              id: `RESULT#${pollId}`,
              question,
              votes: { ...initialResult },
            },
          },
        },
      ],
    });
    const dbResponse = await ddbDocClient.send(command);
    console.log(dbResponse);

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({ id: pollId, ...body }),
    };

    // All log statements are written to CloudWatch
    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );
    return response;
  } catch (err) {
    console.log("createPollHandler error", err);
  }
};
