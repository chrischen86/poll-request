import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME;

export const getByIdHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getByIdHandler only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  console.info("getByIdHandler received:", event);

  const id = event.pathParameters.id;
  var params = {
    TableName: tableName,
    Key: { id: `POLL#${id}` },
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
        body: JSON.stringify({ message: "Poll not found" }),
      };
    }

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify({ ...data.Item, id }),
    };

    console.info(
      `getByIdHandler from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );
    return response;
  } catch (err) {
    console.log("getByIdHandler error", err);

    const response = {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: { message: err },
    };
    return response;
  }
};
