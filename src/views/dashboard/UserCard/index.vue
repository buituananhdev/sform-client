<template>
    <div class="container-Card">
        <div class="table-list-form" @click="$emit('goToSubmit')">
            <div class="data-title">
                {{ form.title }}
            </div>
            <div class="data-description">
                {{ form.description }}
            </div>
            <div class="data-count-question">
                {{ countQuestion }}
            </div>
            <div class="data-createAt">
                {{ form.createdAt }}
            </div>
            <div class="data-updateAt">
                {{ form.updatedAt }}
            </div>
        </div>
        <!-- <div class="main-action">
          <div class="button-action">
          <button @click="toggleIconButton">Actions</button>
          <span class="icon-action-up" v-if="showIconDown"><el-icon><CaretBottom /></el-icon></span>
          <span class="icon-action-down" v-if="showIconUp"><el-icon><CaretTop /></el-icon></span>
          </div>
       </div> -->
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import type { IForm } from "@/types/form"
const props = defineProps<{
    form: IForm
}>()

const showIconUp = ref<boolean>(false)
const showIconDown = ref<boolean>(true)
const toggleIconButton = () => {
    showIconUp.value = !showIconUp.value
    showIconDown.value = !showIconDown.value
}
const countQuestion = computed((count: number) => {
    count = props.form.questions.length
    return count
})
</script>
<style lang="scss" scoped>
.container-Card {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    align-items: center;
    background: #ffffff;
}
.button-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.button-action {
    padding-top: 15px;
}
.button-action button {
    padding: 5px 20px 5px 5px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
}
.button-action {
    position: relative;
}
.button-action button:hover {
    background-color: aquamarine;
}
.icon-action-up {
    position: absolute;
    right: 5.5%;
}
.icon-action-down {
    position: absolute;
    right: 5.5%;
}
.table-list-form {
    margin-left: 20px;
    display: grid;
    grid-template-columns: 200px 200px 200px 200px 200px;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #f2f3f4;
    border-bottom: 1px solid #f2f3f4;
    padding: 5px;
}
.data-count-question {
    text-align: center;
}
.data-description {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
