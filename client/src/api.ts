import { storage } from "./utils";

interface AuthResponse {
  user: User;
  jwt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

const Server_URL = "http://localhost:8080";

export async function handleApiResponse(response: { json: () => any; ok: any; }) {
  const data = await response.json();

  if (response.ok) {
    console.log(data)
    return data;
  } else {
    return Promise.reject(data);
  }
}

export async function getUserProfile() {
  return await fetch(`${Server_URL}/api/auth/me`, {
    headers: {
      Authorization: storage.getToken()
    }
  }).then(handleApiResponse);
}

export async function loginWithEmailAndPassword(data: any): Promise<AuthResponse> {
  return window
    .fetch(`${Server_URL}/api/auth/signin`, {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(handleApiResponse);
}

export async function registerWithEmailAndPassword(
  data: any
): Promise<AuthResponse> {
  return window
    .fetch(`${Server_URL}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(handleApiResponse);
}
