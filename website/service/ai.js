import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import 'dotenv/config';
import * as readline from 'node:readline/promises';

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


export async function socialEvents(events, userPreference) {

    const result = streamText({
      model: openai('gpt-4.1-nano'),
      prompt: ` You are a helpful assistant. You will be given a list of events and user preferences.
Return a list of event Id's in relevance order. The first being most relevant to the user preferences, last id being least relevant.
ex: [4, 1, 3, 2], dont include any other information. Don't lock the body.
  ${events} 
  
  User preferences: ${userPreference}
Return ONLY the list of relevant event id's`
    });

    let fullResponse = '';
    for await (const delta of result.textStream) {
      fullResponse += delta;

    }

  const jsonStart = fullResponse.indexOf('{');
  const jsonEnd = fullResponse.lastIndexOf('}');
  const jsonString = fullResponse.slice(jsonStart, jsonEnd + 1);
  const data = JSON.parse(jsonString);
  process.stdout.write(JSON.stringify(data));
  return data;

}


export async function academicEvents(events, userNeeds) {

    const result = streamText({
      model: openai('gpt-4.1-nano'),
      prompt: ` You are a helpful assistant. A user needs help finding an event that will help them the most based on their needs.
Return a list of event Id's in relevance order. The first being most relevant to the user preferences, last id being least relevant.
ex: [4, 1, 3, 2], dont include any other information. Don't lock the body.
  ${events}

     User preferences: ${userNeeds}
Return ONLY the list of relevant event id's
`
    });

    let fullResponse = '';
    process.stdout.write('\nAssistant: ');
    for await (const delta of result.textStream) {
      fullResponse += delta;
    }
  const jsonStart = fullResponse.indexOf('{');
  const jsonEnd = fullResponse.lastIndexOf('}');
  const jsonString = fullResponse.slice(jsonStart, jsonEnd + 1);
  const data = JSON.parse(jsonString);
  process.stdout.write(JSON.stringify(data));
  return data;
}




