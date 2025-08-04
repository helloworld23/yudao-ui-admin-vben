import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace ReportDefinitionApi {
  /** 报表表样信息 */
  export interface ReportDefinition {
    id: number; // 主键
    reportId?: number; // 报表编号
    name?: string; // 名字
    description: string; // 描述
    columnIndex?: number; // 列序号
    status: number; // 状态
  }
}

/** 查询报表表样分页 */
export function getReportDefinitionPage(params: PageParam) {
  return requestClient.get<PageResult<ReportDefinitionApi.ReportDefinition>>(
    '/validation/report-definition/page',
    { params },
  );
}

/** 查询报表表样列表 */
export function getReportDefinitionList(ids: number[]) {
  return requestClient.get(
    `/validation/report-definition/list?ids=${ids.join(',')}`,
  );
}

/** 查询报表表样详情 */
export function getReportDefinition(id: number) {
  return requestClient.get<ReportDefinitionApi.ReportDefinition>(
    `/validation/report-definition/get?id=${id}`,
  );
}

/** 新增报表表样 */
export function createReportDefinition(
  data: ReportDefinitionApi.ReportDefinition,
) {
  return requestClient.post('/validation/report-definition/create', data);
}

/** 修改报表表样 */
export function updateReportDefinition(
  data: ReportDefinitionApi.ReportDefinition,
) {
  return requestClient.put('/validation/report-definition/update', data);
}

/** 删除报表表样 */
export function deleteReportDefinition(id: number) {
  return requestClient.delete(`/validation/report-definition/delete?id=${id}`);
}

/** 批量删除报表表样 */
export function deleteReportDefinitionListByIds(ids: number[]) {
  return requestClient.delete(
    `/validation/report-definition/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出报表表样 */
export function exportReportDefinition(params: any) {
  return requestClient.download(
    '/validation/report-definition/export-excel',
    params,
  );
}
