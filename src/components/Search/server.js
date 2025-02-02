
const express = require("express");
const OpenAI = require("openai");
const axios = require("axios");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { convert } = require("html-to-text");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const port = 3080;

app.post("/search", async (req, res) => {
  try {
    const { query } = req.body;

    // Run both searches in parallel
    const [searchResult, videoResult] = await Promise.all([
      search(query),
      searchYouTubeVideos(query)
    ]);

    res.status(200).json({
      message: "Successful!",
      ...searchResult,
      videos: videoResult
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
    console.error("Error occurred", error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Helper functions remain the same

async function searchYouTubeVideos(query) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          maxResults: 5,
          q: query,
          type: 'video',
          key: process.env.YOUTUBE_API_KEY
        }
      }
    );
    console.log('YouTube API response:', response.data);

    return response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId
    }));

  } catch (error) {
    console.error('YouTube API Error:', error);
    return [];
  }
}

async function getSearchResults(optimizedQuery) {
  const response = await axios.get(
    "https://api.search.brave.com/res/v1/web/search",
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": process.env.BRAVE_API_KEY,
      },
      params: {
        q: optimizedQuery,
        count: 5,
      },
    }
  );

  return response.data.web?.results || [];
}

async function getPageContent(link) {
  const response = await axios.get(link, { timeout: 5000 });
  const text = response.data;
  return convert(text, { wordwrap: 130 });
}

function cleanText(text) {
  return text.trim().replace(/\s+|\n+/g, " ");
}

// RAG function remains the same
async function extractContextFromResultsWithRAG(query, searchResults) {
  const getRelevantContext = async (query, source) => {
    const content = await getPageContent(source.url);
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 10,
    });

    const chunks = await splitter.splitText(content);

    const vectorStore = await MemoryVectorStore.fromTexts(
      chunks,
      {},
      new OpenAIEmbeddings()
    );

    const result = await vectorStore.similaritySearch(query, 1);

    return `source:${source.url} content: ${result[0]?.pageContent}`;
  };

  const promises = searchResults.map((source) =>
    getRelevantContext(query, source)
  );

  const result = await Promise.allSettled(promises);

  return result
    .filter((res) => res.status === "fulfilled")
    .map((res) => `${cleanText(res.value)}---\n`)
    .join("");
}

async function getRelatedQueries(query) {
  const messages = [
    {
      role: "system",
      content: `You are a search engine expert tasked with getting related search queries.
      Format your response as a markdown-formatted JSON array of strings with the key "related_search_queries".
      Example format:
      \`\`\`json
      {
        "related_search_queries": ["query1", "query2", "query3", "query4", "query5"]
      }
      \`\`\``,
    },
    {
      role: "user",
      content: `User's Query: "${query}" Get 5 related search queries:`,
    },
  ];

  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-4o-mini",
    temperature: 0.8,
    response_format: { type: "json_object" }
  });

  // Extract JSON from markdown if necessary
  const content = completion.choices[0].message.content;
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || [null, content];
  const jsonContent = jsonMatch[1] || content;

  try {
    return JSON.parse(jsonContent)?.related_search_queries || [];
  } catch (error) {
    console.error("Error parsing related queries JSON:", error);
    return [];
  }
}

async function getAnswer(query, context) {
  const messages = [
    {
      role: "system",
      content: `You are an AI-chatbot-powered research and conversational search engine that answers user search queries.
      Format your response in markdown with proper headers (##, ###), lists, emphasis (*italic*, **bold**), and code blocks where appropriate.
      Structure your response with clear sections and use markdown formatting to enhance readability.`,
    },
    {
      role: "user",
      content: `Based on the following context sections, provide a detailed answer to the question in proper markdown format.

Context sections: "${context}"
Question: "${query}"

Please structure your response with:
- Clear section headers using markdown (##, ###)
- Properly formatted lists where appropriate
- Emphasis on key points using *italic* or **bold**
- Code blocks for any technical content
- Keep paragraph breaks for readability`,
    },
  ];

  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-4o-mini",
    temperature: 0.5,
  });

  return completion.choices[0].message.content;
}

async function search(query) {
  const searchResults = await getSearchResults(query);
  const context = await extractContextFromResultsWithRAG(query, searchResults);

  const [answer, relatedQueries] = await Promise.all([
    getAnswer(query, context),
    getRelatedQueries(query),
  ]);

  return {
    answer,
    relatedQueries,
    sources: searchResults.map((source) => ({
      title: source.title,
      url: source.url,
      icon: source.profile.img,
      name: source.profile.name,
    })),
  };
}

module.exports = app;