import type { Note } from "@/types/index";
import { formaDate } from "../../utils/utils";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

type NoteDetailProps = {
  note: Note;
};
export default function NoteDetail({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const queryTask = new URLSearchParams(location.search);
  const taskId = queryTask.get("viewTask")!;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  if (isLoading) return "Cargando...";
  return (
    <div className=" p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por:{" "}
          <span className=" font-bold">{note.createdBy.name}</span>
        </p>
        <p className=" text-xs text-slate-500">{formaDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          type="button"
          className=" bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors "
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
