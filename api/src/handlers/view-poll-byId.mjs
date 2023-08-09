import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME;

export const viewPollByIdHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `viewPollByIdHandler only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  console.info("viewPollByIdHandler received:", event);

  const id = event.pathParameters.id;
  var params = {
    TableName: tableName,
    Key: { id: `RESULT#${id}` },
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    if (data.Item === undefined) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
        body: JSON.stringify({
          error: "Poll Id does not exist",
        }),
      };
    }

    console.log(data.Item);

    const { voterIds, ...rest } = data.Item;

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify({
        ...rest,
        id,
      }),
    };

    console.info(
      `viewPollByIdHandler from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );
    return response;
  } catch (err) {
    console.log("viewPollByIdHandler error", err);
  }
};
