import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ReportRuleApi } from '#/api/validation/reportrule';

import { getReportList } from '#/api/validation/report';
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
      fieldName: 'ruleCode',
      label: '校验规则编号',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入校验规则编号',
      },
    },
    {
      fieldName: 'reportId',
      label: '报文名称',
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
      fieldName: 'fieldId',
      label: '字段名称',
      rules: 'required',
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
      fieldName: 'ruleCategory',
      label: '规则大类',
      rules: 'required',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.VALIDATION_RULE_CATEGORY, 'number'),
        placeholder: '请选择规则大类',
      },
    },
    {
      fieldName: 'ruleType',
      label: '规则细类',
      rules: 'required',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.VALIDATION_RULE_TYPE, 'number'),
        placeholder: '请选择规则细类',
      },
    },
    {
      fieldName: 'validationFlag',
      label: '校验标识',
      rules: 'required',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.VALIDATION_FLAG, 'number'),
        placeholder: '请选择校验标识',
      },
    },
    {
      fieldName: 'ruleDescription',
      label: '规则说明',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入规则说明',
      },
    },
    {
      fieldName: 'involvedTables',
      label: '涉及的表',
      component: 'ApiSelect',
      componentProps: {
        placeholder: '请选择报表',
        allowClear: true,
        api: getReportList,
        labelField: 'name',
        valueField: 'id',
        mode: 'multiple',
      },
    },
    {
      fieldName: 'conditionExpression',
      label: '限定条件',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入限定条件',
      },
    },
    {
      fieldName: 'ruleLogic',
      label: '实现逻辑',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入规则实现逻辑',
      },
    },
    {
      fieldName: 'relationExpression',
      label: '关联关系',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入关联关系',
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'RadioGroup',
      defaultValue: CommonStatusEnum.ENABLE,
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'description',
      label: '备注',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入备注',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'ruleCode',
      label: '校验规则编号',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入校验规则编号',
      },
    },
    {
      fieldName: 'reportId',
      label: '报文名称',
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
      fieldName: 'fieldId',
      label: '字段名称',
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
export function useGridColumns(): VxeTableGridOptions<ReportRuleApi.ReportRule>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'ruleCode',
      title: '校验规则编号',
      minWidth: 120,
    },
    {
      field: 'reportName',
      title: '报文名称',
      minWidth: 120,
    },
    {
      field: 'fieldName',
      title: '字段名称',
      minWidth: 120,
    },
    {
      field: 'ruleCategory',
      title: '规则大类',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.VALIDATION_RULE_CATEGORY },
      },
    },
    {
      field: 'ruleType',
      title: '规则细类',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.VALIDATION_RULE_TYPE },
      },
    },
    {
      field: 'validationFlag',
      title: '校验标识',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.VALIDATION_FLAG },
      },
    },
    {
      field: 'ruleDescription',
      title: '规则说明',
      minWidth: 250,
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
      minWidth: 180,
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
