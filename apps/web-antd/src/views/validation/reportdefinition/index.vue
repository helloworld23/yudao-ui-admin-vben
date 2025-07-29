<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ReportDefinitionApi } from '#/api/validation/reportdefinition';

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlobPart, isEmpty } from '@vben/utils';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteReportDefinition,
  deleteReportDefinitionListByIds,
  exportReportDefinition,
  getReportDefinitionPage,
} from '#/api/validation/reportdefinition';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const router = useRouter();
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});
/** 刷新表格 */
function onRefresh() {
  gridApi.query();
}

/** 创建报表表样 */
function handleCreate() {
  formModalApi.setData({ reportId: reportId.value }).open();
}

/** 编辑报表表样 */
function handleEdit(row: ReportDefinitionApi.ReportDefinition) {
  formModalApi.setData(row).open();
}

/** 查看表样 */
function handleView(row: ReportDefinitionApi.ReportDefinition) {
  router.push({
    path: 'report-rules',
    query: {
      reportDefinitionId: row.id,
      reportId: row.reportId,
    },
  });
}

/** 删除报表表样 */
async function handleDelete(row: ReportDefinitionApi.ReportDefinition) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    key: 'action_key_msg',
  });
  try {
    await deleteReportDefinition(row.id as number);
    message.success({
      content: $t('ui.actionMessage.deleteSuccess', [row.id]),
      key: 'action_key_msg',
    });
    onRefresh();
  } finally {
    hideLoading();
  }
}

/** 批量删除报表表样 */
async function handleDeleteBatch() {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting'),
    key: 'action_key_msg',
  });
  try {
    await deleteReportDefinitionListByIds(deleteIds.value);
    message.success({
      content: $t('ui.actionMessage.deleteSuccess'),
      key: 'action_key_msg',
    });
    onRefresh();
  } finally {
    hideLoading();
  }
}

const deleteIds = ref<number[]>([]); // 待删除报表表样 ID
function setDeleteIds({
  records,
}: {
  records: ReportDefinitionApi.ReportDefinition[];
}) {
  deleteIds.value = records.map((item) => item.id);
}

/** 导出表格 */
async function handleExport() {
  const data = await exportReportDefinition(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({ fileName: '报表表样.xls', source: data });
}

// 获取路由实例
const route = useRoute();
// 定义变量存储报表 ID
const reportId = ref<number | undefined>();

// 挂载后赋值
onMounted(() => {
  // 从 query 参数中获取 id（对应跳转时的 query: { id: row.id }）
  const id = route.query.id;
  if (id) {
    reportId.value = Number(id);
  } else {
    console.warn('未获取到报表ID');
  }
  gridApi.formApi.setFieldValue('reportId', reportId.value);
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
          return await getReportDefinitionPage({
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
  } as VxeTableGridOptions<ReportDefinitionApi.ReportDefinition>,
  gridEvents: {
    checkboxAll: setDeleteIds,
    checkboxChange: setDeleteIds,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="onRefresh" />

    <Grid table-title="报表表样列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['报表表样']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['validation:report-definition:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['validation:report-definition:export'],
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              disabled: isEmpty(deleteIds),
              auth: ['validation:report-definition:delete'],
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
              auth: ['validation:report-definition:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('validation.viewRules'),
              type: 'link',
              icon: ACTION_ICON.VIEW,
              auth: ['validation:report-definition:view'],
              onClick: handleView.bind(null, row),
            },
          ]"
          :drop-down-actions="[
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['validation:report-definition:delete'],
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
