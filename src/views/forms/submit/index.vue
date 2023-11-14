<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getFormApi } from "@/services/form.service.js";
import FormView from "@/components/common/Forms/FormView.vue"
import type { IForm } from "@/types/form";
import { useRoute } from "vue-router";

const route = useRoute();

const dataFormView = ref<IForm>({
    id: "1",
    questions: [],
    description: "",
    title: "",
})

onMounted(async () => {
    try {
        const res = await getFormApi(route.params.id);
        dataFormView.value = res.data;
        console.log(res.data);
    } catch (error) {
        console.error("Error fetching form data:", error);
    }
});
</script>

<template>
    <div class="container">
        <FormView :data="dataFormView" />
    </div>
</template>

<style scoped lang="scss">
/* Your styles go here */
</style>
