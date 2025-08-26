"use client";
import * as React from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createTodo, deleteTodo, listTodos, updateTodo, type Todo } from "@/lib/api";

gsap.registerPlugin(Flip);

export default function TodoList() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [title, setTitle] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const refresh = async () => {
    const data = await listTodos();
    setTodos(data);
  };

  React.useEffect(() => {
    refresh();
  }, []);

  const onAdd = async () => {
    const t = title.trim();
    if (!t) return;
    const children: HTMLElement[] = containerRef.current
      ? (Array.from(containerRef.current.children) as HTMLElement[])
      : [];
    const state = Flip.getState(children);
    const created = await createTodo({ title: t, completed: false });
    setTodos((prev) => [created, ...prev]);
    setTitle("");
    Flip.from(state, { duration: 0.5, ease: "power1.inOut" });
  };

  const onToggle = async (todo: Todo) => {
    const updated = await updateTodo(todo.id!, { completed: !todo.completed, title: todo.title });
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const onDelete = async (todo: Todo) => {
    const children: HTMLElement[] = containerRef.current
      ? (Array.from(containerRef.current.children) as HTMLElement[])
      : [];
    const state = Flip.getState(children);
    await deleteTodo(todo.id!);
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    Flip.from(state, { duration: 0.4, ease: "power1.in" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input placeholder="Add a new task" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onAdd()} />
          <Button onClick={onAdd}>Add</Button>
        </div>
        <div ref={containerRef} className="mt-4 space-y-2">
          {todos.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-md border border-gray-200 p-2 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Checkbox checked={t.completed} onChange={() => onToggle(t)} />
                <span className={t.completed ? "line-through text-gray-500" : ""}>{t.title}</span>
              </div>
              <Button variant="ghost" onClick={() => onDelete(t)}>Delete</Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-gray-500">{todos.length} items</span>
      </CardFooter>
    </Card>
  );
}


