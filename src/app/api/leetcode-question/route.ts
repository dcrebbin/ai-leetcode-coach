export async function POST(req: Request, res: Response) {
  const { question } = await req.json();
  const json = await fetch(`https://leetcode.com/graphql`, {
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
  const retrievedData = await json.json();
  const transformedData = {
    question: retrievedData.data.question.content,
    code: retrievedData.data.question.codeSnippets[0],
  };
  return new Response(JSON.stringify(transformedData));
}
