import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ReportDefinitionApi } from '#/api/validation/reportdefinition';

import { z } from '#/adapter/form';
import { getReportPage } from '#/api/validation/report';
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
      fieldName: 'name',
      label: '名字',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入名字',
      },
    },
    {
      fieldName: 'description',
      label: '描述',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入描述',
      },
    },
    {
      fieldName: 'columnIndex',
      label: '列序号',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入列序号',
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
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
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
      rules: 'selectRequired',
    },
    {
      fieldName: 'name',
      label: '名字',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入名字',
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
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
export function useGridColumns(): VxeTableGridOptions<ReportDefinitionApi.ReportDefinition>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'columnIndex',
      title: '列序号',
      minWidth: 120,
    },
    {
      field: 'reportName',
      title: '报表',
      minWidth: 120,
    },
    {
      field: 'name',
      title: '名字',
      minWidth: 120,
    },
    {
      field: 'status',
      title: '状态',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
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
