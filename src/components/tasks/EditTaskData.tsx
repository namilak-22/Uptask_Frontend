import { useLocation, useParams, Navigate} from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "@/api/TaskApi"
import EditTaskModal from "./EditTaskModal"


export default function EditTaskData() {
    const params=useParams()
    const projectId=params.projectId!

    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const taskId=queryParams.get('editTask')!
    
    const {data, isError}=useQuery({
        queryKey:['task',taskId],
        queryFn:()=>getTaskById({projectId,taskId}),
        enabled: !!taskId, //se pone !! para convertir en booleano si tiene algún contenido la variable, si tiene  es true, sino tiene es false
        retry:1
    })
    if(isError) return <Navigate to={'/404'}/>
   if(data) return <EditTaskModal data={data} taskId={taskId}/>
  
}
