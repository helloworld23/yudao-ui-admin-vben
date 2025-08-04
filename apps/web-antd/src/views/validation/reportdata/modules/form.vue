<script lang="ts" setup>
import type { ReportDataApi } from '#/api/validation/reportdata';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createReportData,
  getReportData,
  updateReportData,
} from '#/api/validation/reportdata';
import { getReportDefinitionList } from '#/api/validation/reportdefinition';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<ReportDataApi.ReportData>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['报表数据'])
    : $t('ui.actionTitle.create', ['报表数据']);
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 80,
  },
  layout: 'horizontal',
  schema: useFormSchema(),
  showDefaultActions: false,
  handleValuesChange: handleSchemaUpdate,
});

/** 处理 schema 更新 */
function handleSchemaUpdate(
  values: Record<string, any>,
  fieldsChanged: string[],
) {
  if (fieldsChanged.includes('reportId')) {
    const reportId = values.reportId;
    const key = `report-data:default-key:${reportId}`;
    formApi.updateSchema([
      {
        key,
        fieldName: 'columnId',
        componentProps: {
          api: async () => getReportDefinitionList([reportId]),
        },
      },
    ]);
  }
}

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    modalApi.lock();
    // 提交表单
    const data = (await formApi.getValues()) as ReportDataApi.ReportData;
    try {
      await (formData.value?.id
        ? updateReportData(data)
        : createReportData(data));
      // 关闭并提示
      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      return;
    }
    // 加载数据
    let data = modalApi.getData<ReportDataApi.ReportData>();
    if (!data) {
      return;
    }
    if (data.id) {
      modalApi.lock();
      try {
        data = await getReportData(data.id);
      } finally {
        modalApi.unlock();
      }
    }
    // 设置到 values
    formData.value = data;
    await formApi.setValues(formData.value);
  },
});
</script>

<template>
  <Modal :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>
