<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ReportRulesApi } from '#/api/validation/reportrules';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlobPart, isEmpty } from '@vben/utils';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteReportRules,
  deleteReportRulesListByIds,
  exportReportRules,
  getReportRulesPage,
} from '#/api/validation/reportrules';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/** 刷新表格 */
function onRefresh() {
  gridApi.query();
}

/** 创建校验规则 */
function handleCreate() {
  formModalApi
    .setData({
      reportId: reportId.value,
      reportDefinitionId: reportDefinitionId.value,
    })
    .open();
}

/** 编辑校验规则 */
function handleEdit(row: ReportRulesApi.ReportRules) {
  formModalApi.setData(row).open();
}

/** 删除校验规则 */
async function handleDelete(row: ReportRulesApi.ReportRules) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    key: 'action_key_msg',
  });
  try {
    await deleteReportRules(row.id as number);
    message.success({
      content: $t('ui.actionMessage.deleteSuccess', [row.id]),
      key: 'action_key_msg',
    });
    onRefresh();
  } finally {
    hideLoading();
  }
}

/** 批量删除校验规则 */
async function handleDeleteBatch() {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting'),
    key: 'action_key_msg',
  });
  try {
    await deleteReportRulesListByIds(deleteIds.value);
    message.success({
      content: $t('ui.actionMessage.deleteSuccess'),
      key: 'action_key_msg',
    });
    onRefresh();
  } finally {
    hideLoading();
  }
}

const deleteIds = ref<number[]>([]); // 待删除校验规则 ID
function setDeleteIds({ records }: { records: ReportRulesApi.ReportRules[] }) {
  deleteIds.value = records.map((item) => item.id);
}

/** 导出表格 */
async function handleExport() {
  const data = await exportReportRules(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({ fileName: '校验规则.xls', source: data });
}

// 获取路由实例
const route = useRoute();
// 定义变量存储报表 ID
const reportId = ref<number | undefined>();
const reportDefinitionId = ref<number | undefined>();

// 挂载后获取路由参数
onMounted(() => {
  // 从 query 参数中获取 id（对应跳转时的 query: { id: row.id }）
  const rDefId = route.query.reportDefinitionId;
  const rId = route.query.reportId;
  if (rId) {
    reportId.value = Number(rId);
  }
  if (rDefId) {
    reportDefinitionId.value = Number(rDefId);
  }
  gridApi.formApi.setFieldValue('reportId', reportId.value);
  gridApi.formApi.setFieldValue('reportDefinitionId', reportDefinitionId.value);
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    pagerConfig: {
      enabled: true,
    },
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getReportRulesPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: { code: 'query' },
      search: true,
    },
  } as VxeTableGridOptions<ReportRulesApi.ReportRules>,
  gridEvents: {
    checkboxAll: setDeleteIds,
    checkboxChange: setDeleteIds,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="onRefresh" />

    <Grid table-title="校验规则列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['校验规则']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['validation:report-rules:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['validation:report-rules:export'],
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              disabled: isEmpty(deleteIds),
              auth: ['validation:report-rules:delete'],
              onClick: handleDeleteBatch,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['validation:report-rules:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['validation:report-rules:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.id]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
