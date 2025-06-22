// Synchronous URL format validation
export function checkUrlFormat(url) {
  const regex = /^https:\/\/www\./;
  return regex.test(url);
}

// Asynchronous URL accessibility validation using server-side API
export default async function checkUrlValid(url) {
  try {
    // First check if URL format is valid
    if (!checkUrlFormat(url)) {
      return false;
    }

    // Call server-side API to validate URL accessibility
    const response = await fetch('/api/validate-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      console.error('URL validation API failed:', response.status);
      return false;
    }

    const data = await response.json();
    console.log('URL validation result:', data);
    
    return data.isValid; // Returns true if status code is 200-299
  } catch (error) {
    console.error('URL validation error:', error);
    return false;
  }
}