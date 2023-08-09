import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { voteSchema } from "../schema/schema.mjs";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME;

export const saveVoteHandler = async (event, context, callback) => {
  console.info("saveVoteHandler received:", event);

  let body;
  if (event.Records) {
    body = JSON.parse(event.Records[0].body);
  } else {
    body = JSON.parse(event.body);
  }

  try {
    await voteSchema.validate(body);
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

  const { pollId, userId, option } = body;

  console.log(option);
  const params = {
    TableName: tableName,
    Key: {
      id: `RESULT#${pollId}`,
    },
    // UpdateExpression:
    //   "SET #voterIds = list_append(if_not_exists(#voterIds, :empty_list), :userId), #option = if_not_exists(#option, :initial) + :inc",
    // ExpressionAttributeValues: {
    //   ":userId": { L: [{ S: userId }] },
    //   ":inc": { N: 1 },
    //   ":empty_list": { L: [] },
    //   ":initial": { N: 0 },
    // },
    // ExpressionAttributeNames: {
    //   "#option": option,
    //   "#voterIds": "voterIds",
    // },

    // UpdateExpression:
    //   "SET #voterIds = list_append(if_not_exists(#voterIds, :empty_list), :userId), #option = if_not_exists(#option, :initial) + :inc",
    // ExpressionAttributeValues: {
    //   ":inc": 1,
    //   ":initial": 0,
    //   ":userId": [userId],
    //   ":empty_list": [],
    // },
    // ExpressionAttributeNames: {
    //   "#option": option,
    //   "#voterIds": "voterIds",
    // },
    UpdateExpression:
      "SET #votes.#option = if_not_exists(#votes.#option, :initial) + :inc ADD #voterIds :userIdSet",
    ExpressionAttributeValues: {
      ":inc": 1,
      ":initial": 0,
      ":userIdSet": new Set([userId]),
      ":userId": userId,
    },
    ExpressionAttributeNames: {
      "#option": option,
      "#voterIds": "voterIds",
      "#votes": "votes",
    },
    ConditionExpression: "NOT contains(#voterIds, :userId)",
  };

  try {
    const data = await ddbDocClient.send(new UpdateCommand(params));
    console.info("saveVoteHandler success - ", data);

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify(body),
    };

    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );
    return response;
  } catch (err) {
    console.log("saveVoteHandler error:", err);

    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({
        message: err.message.includes("conditional request failed")
          ? "User cannot vote again on the same poll"
          : err.message,
      }),
    };
  }
};
