import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ReportDataApi } from '#/api/validation/reportdata';

import { getReportList } from '#/api/validation/report';
import { getRangePickerDefaultProps } from '#/utils';

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
        placeholder: '请选择报表',
        allowClear: true,
        api: getReportList,
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      fieldName: 'columnId',
      label: '字段',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        placeholder: '请选择字段',
        allowClear: true,
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      fieldName: 'rowIndex',
      label: '行序号',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入行序号',
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
      fieldName: 'value',
      label: '值',
      component: 'Input',
      componentProps: {
        placeholder: '请输入值',
      },
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
        placeholder: '请选择报表',
        allowClear: true,
        api: getReportList,
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      fieldName: 'columnId',
      label: '字段',
      component: 'ApiSelect',
      componentProps: {
        placeholder: '请选择字段',
        allowClear: true,
        labelField: 'name',
        valueField: 'id',
      },
      dependencies: {
        triggerFields: ['reportId'],
        disabled: (values) => !values.reportId,
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
export function useGridColumns(): VxeTableGridOptions<ReportDataApi.ReportData>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'reportName',
      title: '报表',
      minWidth: 120,
    },
    {
      field: 'columnName',
      title: '字段',
      minWidth: 120,
    },
    {
      field: 'value',
      title: '值',
      minWidth: 120,
    },
    {
      field: 'rowIndex',
      title: '行序号',
      minWidth: 120,
    },
    {
      field: 'columnIndex',
      title: '列序号',
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
