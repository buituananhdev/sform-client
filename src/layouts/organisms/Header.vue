<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { logoutApi } from "@/services/user.service"

defineProps<{}>()
const router = useRouter()
const authStore = useAuthStore()

const goToLogin: () => void = () => {
    router.push("/login")
}
const goToRegister: () => void = () => {
    router.push("/register")
}

const isLogin = ref<boolean | undefined>(false)

const logout: () => Promise<void> = async () => {
    try {
        await logoutApi()
        localStorage.removeItem("access_token")
        authStore.setAuthStore({
            user: {
                email: "",
                password: "",
            },
            isLoggedIn: false,
        })
        router.push("/login")
    } catch (error) {
        console.error(error)
    }
}
// isLogin.value = authStore.getIsLoggedIn()
</script>

<template>
    <div class="nav-container">
        <div class="nav-container__body">
            <p class="nav-container__body__logo">S-FORM</p>
            <div class="nav-container__body__action" v-if="!authStore.getIsLoggedIn()">
                <el-button type="primary" @click="goToLogin">Login</el-button>
                <el-button type="primary" @click="goToRegister" plain>Register</el-button>
            </div>
            <div class="nav-container__body__info" v-else>
                <el-icon><Avatar /></el-icon> |
                <p>{{ authStore.getUserName() }}</p>
                <el-icon class="nav-container__body__info__icon-right" @click="logout"><Right /></el-icon>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.nav-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ebeef5;
    background-color: #fff;

    &__body {
        width: 100%;
        max-width: 1440px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__logo {
            font-size: 1.5rem;
            font-weight: 700;
            // @include gradient-text;
            color: $color-danger;
        }

        &__action {
            display: flex;
        }
        &__info {
            display: flex;
            align-items: center;
            gap: 10px;
            &__icon-right {
                cursor: pointer;
                &:hover {
                    transform: translateX(10px);
                    transition: all 0.2s linear;
                }
            }
        }
    }
}
</style>
