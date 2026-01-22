import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { type TaskFormData,type Project,type Task, taskSchema} from "../types";

type TaskApiType={
    formData:TaskFormData,
    projectId:Project['_id']
    taskId:Task['_id']
    status:Task['status']
}
export async function createTask({formData,projectId}:Pick<TaskApiType, 'formData'| 'projectId'>) {
    try {
        const url=`/projects/${projectId}/tasks`;
        const {data}=await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        
    }
}
export async function getTaskById({projectId,taskId}: Pick<TaskApiType, 'projectId' | 'taskId'>){
    try {
        const url=`/projects/${projectId}/tasks/${taskId}`;
        const {data}= await api(url)
        const response=taskSchema.safeParse(data)
        if(response.success){
            
            return response.data
        } 
        
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function updateTask({formData,projectId,taskId}:Pick<TaskApiType, 'formData' | 'projectId' | 'taskId'>){
    try {
        const url=`/projects/${projectId}/tasks/${taskId}`;
        const {data}= await api.put<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function deleteTask({projectId,taskId}: Pick<TaskApiType, 'projectId' | 'taskId'>){
    try {
        const url=`/projects/${projectId}/tasks/${taskId}`;
        const {data}= await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function updateStatus({projectId,taskId,status}: Pick<TaskApiType, 'projectId' | 'taskId' | 'status' >){
    try {
        const url=`/projects/${projectId}/tasks/${taskId}/status`;
        const {data}= await api.post<string>(url,{status})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
