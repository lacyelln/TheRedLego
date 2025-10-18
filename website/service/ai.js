import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import 'dotenv/config';
import * as readline from 'node:readline/promises';

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



export async function searchEvents(events, userNeeds) {
  // Build formatted string of event list
  const formattedEvents = events
    .map(e => `ID: ${e.eventID}, Name: ${e.name}`)
    .join('\n');

  // Construct the LLM prompt
  const prompt = `
You are a helpful assistant. A user is looking for the most relevant academic event from a list.

You will be given a list of existing events and a user preference.

Your task is to return the full list of events, sorted by how well each event matches the user's preference.
Only reorder the events — do not change, remove, or add anything.

Respond with the same array of JSON objects, in relevance order. Return ONLY the JSON array and nothing else.

Events:
${formattedEvents}

User preferences: ${userNeeds}
`;

  // Send prompt to LLM
  const result = await streamText({
    model: openai('gpt-4.1-nano'),
    prompt: prompt.trim()
  });

  // Collect the streamed output
  let fullResponse = '';
  process.stdout.write('\nAssistant: ');
  for await (const delta of result.textStream) {
    fullResponse += delta;
  }

  // Extract JSON array from output
  const jsonStart = fullResponse.indexOf('[');
  const jsonEnd = fullResponse.lastIndexOf(']');
  const jsonString = fullResponse.slice(jsonStart, jsonEnd + 1).trim();

  if (!jsonString || jsonStart === -1 || jsonEnd === -1) {
    console.error("LLM response was not valid JSON array:", fullResponse);
    throw new Error("❌ LLM did not return a valid JSON array.");
  }

  try {
    const data = JSON.parse(jsonString);
    console.log("✅ Parsed LLM result:", JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("❌ Error parsing LLM response:", err);
    console.error("Full response:", fullResponse);
    throw new Error("Failed to parse LLM response.");
  }

}




