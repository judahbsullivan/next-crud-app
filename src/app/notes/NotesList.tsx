"use client";
import * as React from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createNote, deleteNote, listNotes, updateNote, type Note } from "@/lib/api";

gsap.registerPlugin(Flip);

export default function NotesList() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const refresh = async () => setNotes(await listNotes());
  React.useEffect(() => { refresh(); }, []);

  const onAdd = async () => {
    const t = title.trim();
    if (!t) return;
    const children: HTMLElement[] = containerRef.current
      ? (Array.from(containerRef.current.children) as HTMLElement[])
      : [];
    const state = Flip.getState(children);
    const created = await createNote({ title: t, content });
    setNotes((prev) => [created, ...prev]);
    setTitle("");
    setContent("");
    Flip.from(state, { duration: 0.5, ease: "power1.inOut" });
  };

  const onUpdate = async (n: Note, fields: Partial<Note>) => {
    const updated = await updateNote(n.id!, { ...n, ...fields });
    setNotes((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
  };

  const onDelete = async (n: Note) => {
    const children: HTMLElement[] = containerRef.current
      ? (Array.from(containerRef.current.children) as HTMLElement[])
      : [];
    const state = Flip.getState(children);
    await deleteNote(n.id!);
    setNotes((prev) => prev.filter((x) => x.id !== n.id));
    Flip.from(state, { duration: 0.4, ease: "power1.in" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <Button onClick={onAdd}>Add Note</Button>
        <div ref={containerRef} className="mt-4 space-y-2">
          {notes.map((n) => (
            <div key={n.id} className="rounded-md border border-gray-200 p-3 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <strong>{n.title}</strong>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => onUpdate(n, { title: n.title + " ✏️" })}>Edit</Button>
                  <Button variant="ghost" onClick={() => onDelete(n)}>Delete</Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{n.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-gray-500">{notes.length} notes</span>
      </CardFooter>
    </Card>
  );
}


