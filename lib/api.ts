export type Course = {
  id: string;
  title: string;
  instructor?: string;
  level?: string;
  description?: string;
  [key: string]: unknown;
};

export type ApiStatus = {
  status?: string;
  message?: string;
  [key: string]: unknown;
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://ed-tech-3vlc.onrender.com";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Health/status fallbacks cover common backend patterns.
export async function getApiStatus() {
  const healthPaths = ["/health", "/api/health", "/api/v1/health"];

  for (const path of healthPaths) {
    try {
      return await request<ApiStatus>(path);
    } catch {
      // try next path
    }
  }

  throw new Error("Unable to fetch backend health endpoint");
}

// Courses fallbacks cover common backend route versions.
export async function getCourses() {
  const coursePaths = ["/courses", "/api/courses", "/api/v1/courses"];

  for (const path of coursePaths) {
    try {
      return await request<Course[] | { courses: Course[] }>(path);
    } catch {
      // try next path
    }
  }

  throw new Error("Unable to fetch courses endpoint");
}

export function normalizeCourses(payload: Course[] | { courses: Course[] }) {
  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.courses ?? [];
}
