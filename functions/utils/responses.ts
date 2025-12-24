export function jsonResponse<T>(data: T, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400',
      ...headers,
    },
  });
}

export function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status);
}
