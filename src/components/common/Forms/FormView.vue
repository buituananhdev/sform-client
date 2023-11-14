<script setup lang="ts">
import { ref, defineProps, onBeforeMount } from "vue"
import type { IForm, IAnswer } from "@/types/form"
import CustomField from "./CustomField.vue"
import { submitForm } from "@/services/form.service"
import { useRoute } from "vue-router"
import { ElNotification } from "element-plus"

const route = useRoute()

const props = defineProps<{
    data: IForm
}>()
const answers = ref<IAnswer[]>([])
const isSubmit = ref(false)

const handleSubmit = async (): void => {
    try {
        console.log(answers.value)
        const res = await submitForm(route.params.id, answers.value)
        console.log(res["data"])
        isSubmit.value = true
        showNotification("Success", "Submit form success", "success")
    } catch (err) {
        console.error(err)
        showNotification("Failed", "Submit form failed", "error")
    }
}

const changeValue = (value: IAnswer): void => {
    const existingAnswerIndex = answers.value.findIndex((answer) => answer.questionId === value.questionId)
    if (existingAnswerIndex !== -1) {
        answers.value.splice(existingAnswerIndex, 1)
    }
    answers.value = [...answers.value, value]
}

const showNotification = (title: string, message: string, type: "success" | "error"): void => {
    ElNotification({
        title,
        message,
        type,
    })
}
</script>

<template>
    <div class="form-container" v-if="!isSubmit">
        <h1 class="form-container__title">{{ data.title }}</h1>
        <div class="form-container__body">
            <div class="form-container__body__header">
                <p class="form-container__body__header__subtitle">{{ data.description }}</p>
            </div>
            <div class="form-container__body__form">
                <div class="form-container__body__form__item" v-for="field in data.questions" :key="field.id">
                    <p class="form-item__name">{{ "Question: " + field.label }}</p>
                    <custom-field @update:model-value="changeValue" v-model="answer" :field="field" />
                </div>
            </div>
            <div class="form-container__body__action">
                <el-button type="primary" round @click="handleSubmit">Submit</el-button>
            </div>
        </div>
    </div>
    <div class="thanks-container" v-else>Thank you for filling out the form</div>
</template>

<style scoped lang="scss">
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
        font-size: 2rem;
        @include gradient-text;
        font-weight: 700;
    }

    &__body {
        margin-top: 20px;
        max-width: 1440px;
        min-width: 450px;
        padding: 40px 40px;
        border-radius: 18px;
        display: flex;
        flex-direction: column;
        box-shadow: $shadow-primary;
        justify-content: center;
        background: #fff;
        gap: 20px;

        &__header {
            width: 100%;
            max-width: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &__subtitle {
                font-size: 1rem;
                font-weight: 400;
                color: #a0aec0;
            }
        }

        &__form {
            width: 100%;
            max-width: 500px;

            &__item {
                margin-top: 10px;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;

                .form-item__title {
                    @include text-style(12px, 600, rgb(73, 73, 73));
                    margin-bottom: 8px;
                }
            }
        }

        &__action {
            margin-top: 20px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            & > button {
                width: 100px;
            }
        }
    }
}

.thanks-container {
    margin-top: 200px;
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>
