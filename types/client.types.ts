export interface Client {
    id_client?: number
    name?: string
    email?: string
    created_at?: Date
    deleted_at?: Date
}


export type ClientErrors = {
    [K in keyof Client]?: boolean
}

export type ClientReturn<T> =
    | { success: true; data: T; message?: string }
    | { success: false; data?: never; message: string; errors?: ClientErrors };