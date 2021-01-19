async function request(path, options = {}) {
  const url = `${process.env.REACT_APP_API_ORIGIN}${path}`;
  console.log(url);
  const response = await fetch(url, options);
  return response.json();
}

export async function getActiveUsers(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/active_users?${params.toString()}`);
}

export async function getActiveUser(active_userId) {
  return request(`/active_users/${active_userId}`);
}

