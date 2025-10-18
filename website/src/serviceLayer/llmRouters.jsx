export async function getSocialResponse(userInfo){
    const response = await fetch(`${API_BASE}/event/names`);
    const socialEvent = socialEvents(response.social, userInfo);
    return socialEvent;
}

export async function getAcademicResponse(userInfo){
    const response = await fetch(`${API_BASE}/event/names`);
    const academicEvent = academicEvents(response.academic, userInfo);
    return academicEvent;
}