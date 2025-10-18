import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import 'dotenv/config';
import * as readline from 'node:readline/promises';

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


export async function socialEvents(userPreference) {

    const result = streamText({
      model: openai('gpt-4.1-nano'),
      prompt: ` You are a helpful assistant. You will be given a list of events and user preferences.
Return ONLY a valid JSON object in this format:
{
  "eventID": number,
  "name": string,
  "reason": string
}
  “events”: [
	{ “eventID”: 0, “name”: Watch BYU Basketball Game, “poster”: Jimmy Fallon, “location”: Marriot Center, “date”: 9/15 “time”: 7:00pm }, 
	{ “eventID”: 1, “name”: Chess Tournament, “poster”: President Reese, “location”: TMCB 109, “date”: 9/15 “time”: 5:00pm }, 
  { “eventID”: 2, “name”: Heritage Book Club, “poster”: Jackie Dullman, “location”: Heritage Main Building 2nd Floor, “date”: 9/15 “time”: 7:30pm }, 
	{ “eventID”: 3, “name”: Play in a Volleyball Game, “poster”: Dan Ellis, “location”: Heritage Halls Courts, “date”: 9/16 “time”: 5:00pm }
    ] 
  
  User preferences: ${userPreference}
Select the single best matching event and explain briefly why as if you were talking to the person.
Return ONLY the JSON object — no extra text.`
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


export async function academicEvents(userNeeds) {

    const result = streamText({
      model: openai('gpt-4.1-nano'),
      prompt: ` You are a helpful assistant. A user needs help finding an event that will help them the most based on their needs.
Return ONLY a valid JSON object in this format:
{
  "eventID": number,
  "name": string,
  "reason": string
}
  “events”: [
	{ “eventID”: 0, “name”: Math 314 Tutor, “poster”: Jeremy Tilo, “location”: Wilkinson Center 3021, “date”: 9/15 “time”: 12:00pm }, 
	{ “eventID”: 1, “name”: Math 290 Study Group, “poster”: Sarah Sand, “location”: TMCB 215, “date”: 9/13 “time”: 2:00pm }, 
  { “eventID”: 2, “name”: Lit 301 Book Review, “poster”: Jackie Dullman, “location”: JFSB B162, “date”: 9/13 “time”: 2:15pm },
	{ “eventID”: 3, “name”: Calc 2 Midterm Review, “poster”: Math 112 TA's, “location”: JKB 2001, “date”: 9/15 “time”: 3:00pm }
    ]

     User preferences: ${userNeeds}
Select the single best matching event for their needs and explain briefly why as if you were talking to the person.
Return the event selected in ONE JSON object — no extra text. 
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




