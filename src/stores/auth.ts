import { IAuthState } from "@/types/user"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore("auth", () => {
    const state = ref<IAuthState>({
        user: {
            email: "",
            password: "",
        },
        isLoggedIn: false,
    })

    const setAuthStore = (data: IAuthState) => {
        state.value = data
    }

    const getUserName = () => {
        return state.value.user.name
    }

    const getIsLoggedIn = () => {
        return state.value.isLoggedIn
    }
    return {
        state,
        setAuthStore,
        getUserName,
        getIsLoggedIn,
    }
})
