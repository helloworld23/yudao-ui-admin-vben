import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace ReportRuleApi {
  /** 校验规则信息 */
  export interface ReportRule {
    id: number; // 主键
    ruleCode?: string; // 校验规则编号
    reportName?: string; // 报文名称
    fieldName?: string; // 字段名称
    ruleCategory?: number; // 规则大类
    ruleType?: number; // 规则细类
    validationFlag?: number; // 校验标识
    ruleDescription: string; // 规则说明
    involvedTables: string; // 涉及的表
    ruleLogic: string; // 规则实现逻辑
    conditionExpression: string; // 限定条件
    relationExpression: string; // 关联关系
    description: string; // 备注
    status: number; // 状态
  }
}

/** 查询校验规则分页 */
export function getReportRulePage(params: PageParam) {
  return requestClient.get<PageResult<ReportRuleApi.ReportRule>>(
    '/validation/report-rule/page',
    { params },
  );
}

/** 查询校验规则详情 */
export function getReportRule(id: number) {
  return requestClient.get<ReportRuleApi.ReportRule>(
    `/validation/report-rule/get?id=${id}`,
  );
}

/** 新增校验规则 */
export function createReportRule(data: ReportRuleApi.ReportRule) {
  return requestClient.post('/validation/report-rule/create', data);
}

/** 修改校验规则 */
export function updateReportRule(data: ReportRuleApi.ReportRule) {
  return requestClient.put('/validation/report-rule/update', data);
}

/** 删除校验规则 */
export function deleteReportRule(id: number) {
  return requestClient.delete(`/validation/report-rule/delete?id=${id}`);
}

/** 批量删除校验规则 */
export function deleteReportRuleListByIds(ids: number[]) {
  return requestClient.delete(
    `/validation/report-rule/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出校验规则 */
export function exportReportRule(params: any) {
  return requestClient.download('/validation/report-rule/export-excel', params);
}
