import { reactive } from 'vue'

export interface User {
    id: string
    nome: string
    email: string
    token: string
}

export const user = reactive({
    user: {} as User,
    setUser(data: User){
        this.user = data
    }
})