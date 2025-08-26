export type Todo = {
  id?: number;
  title: string;
  completed: boolean;
  created_at?: string;
};

export type Note = {
  id?: number;
  title: string;
  content: string;
  created_at?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`,
    { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } }
  );
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

// Todos
export const listTodos = () => http<Todo[]>("/todos");
export const createTodo = (data: Pick<Todo, 'title' | 'completed'>) =>
  http<Todo>("/todos", { method: 'POST', body: JSON.stringify(data) });
export const updateTodo = (id: number, data: Partial<Todo>) =>
  http<Todo>(`/todos/${id}`, { method: 'PUT', body: JSON.stringify({ id, ...data }) });
export const deleteTodo = (id: number) =>
  fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' }).then(() => undefined);

// Notes
export const listNotes = () => http<Note[]>("/notes");
export const createNote = (data: Pick<Note, 'title' | 'content'>) =>
  http<Note>("/notes", { method: 'POST', body: JSON.stringify(data) });
export const updateNote = (id: number, data: Partial<Note>) =>
  http<Note>(`/notes/${id}`, { method: 'PUT', body: JSON.stringify({ id, ...data }) });
export const deleteNote = (id: number) =>
  fetch(`${API_BASE}/notes/${id}`, { method: 'DELETE' }).then(() => undefined);

// Weather
export type CurrentWeather = {
  time?: string;
  temperature_2m?: number;
  wind_speed_10m?: number;
  relative_humidity_2m?: number;
};

export const getWeather = (lat: number, lon: number) =>
  http<CurrentWeather>(`/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`);


