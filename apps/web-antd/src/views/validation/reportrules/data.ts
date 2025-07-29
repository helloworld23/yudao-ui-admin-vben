import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ReportRulesApi } from '#/api/validation/reportrules';

import { z } from '#/adapter/form';
import { getReportPage } from '#/api/validation/report';
import { getReportDefinitionPage } from '#/api/validation/reportdefinition';
import {
  CommonStatusEnum,
  DICT_TYPE,
  getDictOptions,
  getRangePickerDefaultProps,
} from '#/utils';

/** 新增/修改的表单 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'id',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'name',
      label: '规则名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入规则名称',
      },
    },
    {
      fieldName: 'reportId',
      label: '报表',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        api: async () => {
          const data = await getReportPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        },
        placeholder: '请选择报表',
      },
    },
    {
      fieldName: 'reportDefinitionId',
      label: '字段',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        api: async () => {
          const data = await getReportDefinitionPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        },
        placeholder: '请选择报表',
      },
    },
    {
      fieldName: 'valueType',
      label: '值类型',
      rules: 'required',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.VALIDATION_VALUE_TYPE, 'number'),
        placeholder: '请选择值类型',
      },
    },
    {
      fieldName: 'dimension',
      label: '维度字段',
      component: 'ApiSelect',
      componentProps: {
        api: async () => {
          const data = await getReportPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        },
        placeholder: '请选择报表',
      },
      dependencies: {
        triggerFields: ['valueType'],
        show(values) {
          return values.valueType === 1;
        },
        required(values) {
          return values.valueType === 1;
        },
      },
    },
    {
      fieldName: 'compareType',
      label: '规则类型',
      rules: 'required',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.VALIDATION_COMPARE_TYPE, 'number'),
        placeholder: '请选择规则类型',
      },
    },
    {
      fieldName: 'targetReportId',
      label: '目标报表',
      component: 'ApiSelect',
      componentProps: {
        api: async () => {
          const data = await getReportPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        },
        placeholder: '请选择报表',
      },
    },
    {
      fieldName: 'targetReportDefinitionId',
      label: '目标字段',
      component: 'ApiSelect',
      componentProps: {
        api: async () => {
          const data = await getReportDefinitionPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        },
        placeholder: '请选择报表',
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
    {
      fieldName: 'description',
      label: '描述',
      component: 'Textarea',
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: '规则名称',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入规则名称',
      },
    },
    {
      fieldName: 'reportId',
      label: '报表',
      component: 'ApiSelect',
      componentProps: {
        api: async () => {
          const data = await getReportPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        },
        placeholder: '请选择报表',
      },
    },
    {
      fieldName: 'reportDefinitionId',
      label: '字段',
      component: 'ApiSelect',
      componentProps: {
        api: async () => {
          const data = await getReportDefinitionPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        },
        placeholder: '请选择字段',
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择状态',
      },
    },
    {
      fieldName: 'createTime',
      label: '创建时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<ReportRulesApi.ReportRules>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'name',
      title: '规则名称',
      minWidth: 120,
    },
    {
      field: 'reportId',
      title: '报表',
      minWidth: 120,
    },
    {
      field: 'reportDefinitionId',
      title: '字段',
      minWidth: 120,
    },
    {
      field: 'valueType',
      title: '值类型',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.VALIDATION_VALUE_TYPE },
      },
    },
    {
      field: 'compareType',
      title: '规则类型',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.VALIDATION_COMPARE_TYPE },
      },
    },
    {
      field: 'dimension',
      title: '维度字段',
      minWidth: 120,
    },
    {
      field: 'targetReportId',
      title: '目标报表',
      minWidth: 120,
    },
    {
      field: 'description',
      title: '描述',
      minWidth: 120,
    },
    {
      field: 'targetReportDefinitionId',
      title: '目标字段',
      minWidth: 120,
    },
    {
      field: 'status',
      title: '状态',
      minWidth: 120,
    },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 120,
      formatter: 'formatDateTime',
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
