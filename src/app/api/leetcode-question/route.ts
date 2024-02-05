export async function POST(req: Request, res: Response) {
  const { question } = await req.json();
  const response = await fetch(`https://leetcode.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationName: "questionContent",
      variables: { titleSlug: question },
      query: `query questionContent($titleSlug: String!) {
              question(titleSlug: $titleSlug) {
                  content
                  codeSnippets {
                  lang
                  langSlug
                  code
                  }   }
              }
`,
    }),
  });
  if (!response.ok) {
    console.log(await response.text());
    return new Response(response.statusText, { status: response.status });
  }
  const retrievedData = await response.json();
  if (!retrievedData.data.question.content) {
    return new Response(JSON.stringify({ message: "Question is premium, manually import the question (not yet implemented) ", status: 404 }));
  }
  const transformedData = {
    question: retrievedData.data.question.content,
    code: retrievedData.data.question.codeSnippets[0].code,
  };
  return new Response(JSON.stringify(transformedData));
}
