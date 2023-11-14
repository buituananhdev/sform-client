<template>
    <div class="detail-container">
        <h2 class="detail-container__title">List Submitted</h2>
        <el-table v-if="listSubmission" :data="listSubmission" style="width: 100%" class="detail-container__table">
            <el-table-column v-for="(item, index) in listHeader" :prop="item.prop" :label="item.label" class="detail-container__table__row" :key="index" :fixed="index == 0" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { IFieldDetailForm } from "@/types/form"
import { useRoute } from "vue-router"
import { getAllsubmittedApi } from "@/services/form.service"
import { onMounted, ref } from "vue"
import { ElNotification } from "element-plus"

const route = useRoute()

const listSubmission = ref([])
const listHeader = ref<IFieldDetailForm>()
const fetchData: () => Promise<void> = async () => {
    try {
        const res = await getAllsubmittedApi(route.params.id as string)
        const listHeaderTmp = ref()
        listHeaderTmp.value = res.data.question_labels
        listHeader.value = listHeaderTmp.value.map((label: string) => {
            return {
                prop: label,
                label: label.charAt(0).toUpperCase() + label.slice(1),
            }
        })
        listSubmission.value = res.data.submissions.map((submission) => submission.answers)
        console.log("lis", listSubmission.value)
    } catch (error) {
        ElNotification({
            title: "Error",
            message: "Get submisstion failed!",
            type: "error",
        })
        console.error(error)
    }
}
onMounted(async () => {
    await fetchData()
})
</script>
<style lang="scss" scoped>
.detail-container {
    padding: 30px 8%;
    overflow: hidden;
    &__table {
        width: 100%;
        height: 70vh;
    }
    &__title {
        padding: 20px 0;
    }
}
</style>
