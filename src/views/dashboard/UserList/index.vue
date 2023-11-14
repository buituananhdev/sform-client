<template>
    <div class="container-list">
        <div class="container-search">
            <div class="container-left">
                <h1>User List</h1>
                <span class="input-search">
                    <el-icon class="icon-search"><Search /></el-icon>
                    <input type="text" v-model="keySearch" placeholder="Enter title, description..." />
                </span>
            </div>
            <div class="button-create">
                <button @click="CreateForm()">Create Form</button>
            </div>
        </div>
        <div class="container-card">
            <div>
                <div class="row-title-card">
                    <table class="">
                        <th class="" v-for="(column, index) in tableColumns" :key="index">
                            {{ column }}
                        </th>
                    </table>
                </div>
                <div v-for="form in filteredUsers" :key="form.id">
                    <UserCard :form="form" @goToSubmit="goToSubmit(form.id)" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue"
import { useRouter } from "vue-router"
import UserCard from "@/views/dashboard/UserCard/index.vue"
import { getAllFormApi } from "@/services/form.service"
import { ElNotification } from "element-plus"
import type { IForm } from "@/types/form"

const router = useRouter()
const tableColumns = ref(["Title", "Description", "Question", "CreateAt", "UpdateAt"])
const listForm = ref<Array<IForm>>([])

const getListForm = async (): Promise<void> => {
    try {
        const res = await getAllFormApi()
        ElNotification({
            title: "Success",
            message: "Get All form success",
            type: "success",
        })
        listForm.value = res.data
        console.log(listForm.value)
    } catch (error) {
        console.log("error", error)
    }
}

const goToSubmit: (id: string) => void = (id) => {
    router.push(`/forms/${id}/detail`)
}
onBeforeMount(() => {
    getListForm()
})

const keySearch = ref<string>("")

const filteredUsers = computed(() => {
    return listForm.value.filter(
        (form) => form.title.toLowerCase().includes(keySearch.value.toLowerCase()) || form.description.toLowerCase().includes(keySearch.value.toLowerCase())
        // form.updatedAt.toLowerCase().includes(keySearch.value.toLowerCase()) ||
        // form.createdAt.toLowerCase().includes(keySearch.value.toLowerCase())
    )
})

const CreateForm = () => {
    router.push("/forms/create")
}
</script>
<style lang="scss" scoped>
.container-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.input-search {
    display: flex;
    justify-content: center;
    align-items: center;
}
.container-card {
    width: 100%;
    height: 100%;
    display: grid;
    font-size: 14px;
}
.row-title-card table {
    display: grid;
    grid-template-columns: 50px 400px 110px 180px 150px;
    align-items: center;
    background-color: #f2f3f4;
    padding: 15px;
    border-radius: 16px;
}
.container-search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    gap: 30px;
    margin-top: 20px;
    margin-left: 20px;
}
.container-left {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
.input-search {
    position: relative;
    border: 1px solid #b7b8bb;
    border-radius: 6px;
    padding: 7px 10px 7px 30px;
}
.input-search input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
}
.input-search .icon-search {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 0;
}
.button-create button {
    padding: 10px;
    border-radius: 16px;
    border: none;
    cursor: pointer;
}
</style>
