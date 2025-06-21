export default function jsonToTable(jsonString) {
  try {
    // 如果输入是字符串，尝试解析为JSON
    let jsonObj;
    if (typeof jsonString === 'string') {
      // 移除可能的 "json\n" 前缀
      let cleanString = jsonString.replace(/^json\n/, '').trim();
      
      // 移除Markdown代码块格式 (```json ... ```)
      cleanString = cleanString.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      
      jsonObj = JSON.parse(cleanString);
    } else {
      jsonObj = jsonString;
    }

    // 生成Markdown格式
    let markdown = '';
    
    // 基本信息表格
    markdown += '## Job Information\n\n';
    markdown += '| Field | Value |\n';
    markdown += '|-------|-------|\n';
    
    if (jsonObj.jobRole) {
      markdown += `| **Role** | ${jsonObj.jobRole} |\n`;
    }
    if (jsonObj.companyName) {
      markdown += `| **Company** | ${jsonObj.companyName} |\n`;
    }
    if (jsonObj.companyWebsite) {
      markdown += `| **Website** | [${jsonObj.companyWebsite}](${jsonObj.companyWebsite}) |\n`;
    }
    if (jsonObj.companyIndustry) {
      markdown += `| **Industry** | ${jsonObj.companyIndustry} |\n`;
    }
    if (jsonObj.location) {
      markdown += `| **Location** | ${jsonObj.location} |\n`;
    }
    if (jsonObj.salaryRange) {
      markdown += `| **Salary** | ${jsonObj.salaryRange} |\n`;
    }

    // 工作职责
    if (jsonObj.jobRequirements) {
      markdown += '\n## Job Requirements\n\n';
      const requirements = jsonObj.jobRequirements.split('\n').filter(req => req.trim());
      requirements.forEach(req => {
        markdown += `${req}\n\n`;
      });
    }

    // 所需技能
    if (jsonObj.requiredSkills && jsonObj.requiredSkills.length > 0) {
      markdown += '\n## Required Skills\n\n';
      jsonObj.requiredSkills.forEach(skill => {
        markdown += `- **${skill}**\n`;
      });
    }

    return markdown.trim();
  } catch (error) {
    console.error('Error formatting JSON:', error);
    return jsonString;
  }
}