function stepSuccess(stepData: []) {
  return stepData.find((step: any) => {
    return step.step_details.message_creation !== undefined;
  });
}

export async function POST(req: Request) {
  const json = await req.json();

  const { password, message, customAssistant } = json;

  if (password != process.env.SERVER_PASSWORD) {
    return new Response("Incorrect password", { status: 401 });
  }
  const createThread = await fetch("https://api.openai.com/v1/threads/runs", {
    method: "POST",
    body: JSON.stringify({
      assistant_id: customAssistant,
      thread: {
        messages: [{ role: "user", content: message }],
      },
    }),
    headers: {
      "Content-Type": "application/json",
      "OpenAI-Beta": "assistants=v1",
      Authorization: "Bearer " + process.env.OPEN_AI_API_KEY,
    },
  });

  if (!createThread.ok) {
    console.error("Failed to create thread:", await createThread.json());
    throw new Response("Failed to create thread");
  }

  const threadResponse = await createThread.json();
  const { id, thread_id } = threadResponse;

  let stepData = [];
  let iterations = 0;

  while (!stepSuccess(stepData)) {
    iterations++;
    if (iterations > 25) {
      throw new Response("Failed to get steps");
    }
    const getSteps = await fetch(`https://api.openai.com/v1/threads/${thread_id}/runs/${id}/steps`, {
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v1",
        Authorization: "Bearer " + process.env.OPEN_AI_API_KEY,
      },
    });

    if (!getSteps.ok) {
      console.error("Failed to get steps:", getSteps);
      throw new Response("Failed to get steps");
    }

    const stepsResponse = await getSteps.json();
    stepData = stepsResponse.data;

    await new Promise((r) => setTimeout(r, 100));
  }
  const messageId = stepData.find((step: any) => {
    return step.step_details.message_creation !== undefined;
  }).step_details.message_creation.message_id;

  const getMessage = await fetch(`https://api.openai.com/v1/threads/${thread_id}/messages/${messageId}`, {
    headers: {
      "Content-Type": "application/json",
      "OpenAI-Beta": "assistants=v1",
      Authorization: "Bearer " + process.env.OPEN_AI_API_KEY,
    },
  });

  if (!getMessage.ok) {
    console.error("Failed to get message:", getMessage);
    throw new Response("Failed to get message");
  }

  const messageResponse = await getMessage.json();
  const retrievedMessage = messageResponse.content[0].text.value;

  const regex = /【.*/g;
  const sanitizedMessage = retrievedMessage.replace(regex, "");

  return new Response(sanitizedMessage);
}
