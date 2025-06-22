import checkUrlValid from './checkurlvalid'

export default async function cleanJsonData(jsonString) {

  try {
        let jsonObj;
    let cleanString = '';

    if (typeof jsonString === 'string') {
      // Remove possible "json\n" prefix
      cleanString = jsonString.replace(/^json\n/, '').trim();

      // Remove Markdown code block format (```json ... ```)
      cleanString = cleanString.replace(/^```json\s*/, '').replace(/\s*```$/, '');

      // Early return if not likely to be JSON (e.g., plain message string)
      if (!cleanString.trim().startsWith('{')) {
        // It’s not a JSON, just return as plain markdown block
        return `> ${cleanString.trim()}`;
      }

      jsonObj = JSON.parse(cleanString);
    } else {
      jsonObj = jsonString;
    }

    // Generate clear text format
    let result = '';
    
    // Basic information
    if (jsonObj.jobRole) {
      result += `**Role:** ${jsonObj.jobRole}\n\n`;
    }
    if (jsonObj.companyName) {
      result += `**Company:** ${jsonObj.companyName}\n\n`;
    }
    if (jsonObj.companyWebsite) {
      // Check if website URL is valid and accessible
      const isWebsiteValid = await checkUrlValid(jsonObj.companyWebsite);
      if (isWebsiteValid) {
        result += `**Website:** [${jsonObj.companyWebsite}](${jsonObj.companyWebsite})\n\n`;
      } else {
        result += `**Website:** Null\n\n`;
      }
    } else {
      // If companyWebsite is null, undefined, or empty, show Null
      result += `**Website:** Null\n\n`;
    }

    if (jsonObj.companyIndustry) {
      result += `**Industry:** ${jsonObj.companyIndustry}\n\n`;
    }
    if (jsonObj.location) {
      result += `**Location:** ${jsonObj.location}\n\n`;
    }
    if (jsonObj.salaryRange) {
      result += `**Salary:** ${jsonObj.salaryRange}\n\n`;
    }

    // Job requirements (no title)
    if (jsonObj.jobRequirements) {
      result += '**Job Requirements:**\n\n';
      const requirements = jsonObj.jobRequirements.split('\n').filter(req => req.trim());
      requirements.forEach(req => {
        // Remove leading * symbol and bullet points (●, •, etc.)
        const cleanReq = req.replace(/^[\*\●\•]\s*/, '');
        result += `• ${cleanReq}\n\n`;
      });
    }

    // Required skills
    if (jsonObj.requiredSkills && jsonObj.requiredSkills.length > 0) {
      result += '**Stacks:**\n\n';
      jsonObj.requiredSkills.forEach(skill => {
        result += `• ${skill}\n\n`;
      });
    }

    return result.trim();
  } catch (error) {
    console.error('Error formatting JSON:', error);
    return jsonString;
  }
}