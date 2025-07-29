import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace ReportRulesApi {
  /** 校验规则信息 */
  export interface ReportRules {
    id: number; // 主键
    name?: string; // 规则名称
    reportId?: number; // 报表编号
    reportDefinitionId?: number; // 字段编号
    valueType?: number; // 值类型
    compareType?: number; // 规则类型
    dimension: number; // 维度字段
    targetReportId: number; // 目标报表编号
    description: string; // 描述
    targetReportDefinitionId: number; // 目标字段编号
    status: number; // 状态
  }
}

/** 查询校验规则分页 */
export function getReportRulesPage(params: PageParam) {
  return requestClient.get<PageResult<ReportRulesApi.ReportRules>>(
    '/validation/report-rules/page',
    { params },
  );
}

/** 查询校验规则详情 */
export function getReportRules(id: number) {
  return requestClient.get<ReportRulesApi.ReportRules>(
    `/validation/report-rules/get?id=${id}`,
  );
}

/** 新增校验规则 */
export function createReportRules(data: ReportRulesApi.ReportRules) {
  return requestClient.post('/validation/report-rules/create', data);
}

/** 修改校验规则 */
export function updateReportRules(data: ReportRulesApi.ReportRules) {
  return requestClient.put('/validation/report-rules/update', data);
}

/** 删除校验规则 */
export function deleteReportRules(id: number) {
  return requestClient.delete(`/validation/report-rules/delete?id=${id}`);
}

/** 批量删除校验规则 */
export function deleteReportRulesListByIds(ids: number[]) {
  return requestClient.delete(
    `/validation/report-rules/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出校验规则 */
export function exportReportRules(params: any) {
  return requestClient.download(
    '/validation/report-rules/export-excel',
    params,
  );
}
