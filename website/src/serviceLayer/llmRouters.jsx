const API_BASE = "http://localhost:4000";

export async function getAcademicResponse(userInfo) {
  const eventNamesResponse = await fetch(`${API_BASE}/api/event/names`);
  const allEvents = await eventNamesResponse.json();
    console.log("Events fetched from /event/names:", allEvents);  // ✅ log here

    if (!allEvents || !allEvents.academic) {
    throw new Error("No academic events returned from API");
    }

  const res = await fetch(`${API_BASE}/api/academic-response`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ events: allEvents.academic, userInfo })
  });

  const data = await res.json();
  return data;

}


export async function getSocialResponse(userInfo) {
  const eventNamesResponse = await fetch(`${API_BASE}/api/event/names`);
  const allEvents = await eventNamesResponse.json();

  const res = await fetch(`${API_BASE}/api/social-response`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ events: allEvents.social, userInfo })
  });

  const data = await res.json();
  return data;
}