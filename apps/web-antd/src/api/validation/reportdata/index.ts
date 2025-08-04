import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace ReportDataApi {
  /** 报表数据信息 */
  export interface ReportData {
    id: number; // 主键
    reportId?: number; // 报表
    columnId?: number; // 字段
    rowIndex?: number; // 行序号
    columnIndex?: number; // 列序号
    value: string; // 值
  }
}

/** 查询报表数据分页 */
export function getReportDataPage(params: PageParam) {
  return requestClient.get<PageResult<ReportDataApi.ReportData>>(
    '/validation/report-data/page',
    { params },
  );
}

/** 查询报表数据详情 */
export function getReportData(id: number) {
  return requestClient.get<ReportDataApi.ReportData>(
    `/validation/report-data/get?id=${id}`,
  );
}

/** 新增报表数据 */
export function createReportData(data: ReportDataApi.ReportData) {
  return requestClient.post('/validation/report-data/create', data);
}

/** 修改报表数据 */
export function updateReportData(data: ReportDataApi.ReportData) {
  return requestClient.put('/validation/report-data/update', data);
}

/** 删除报表数据 */
export function deleteReportData(id: number) {
  return requestClient.delete(`/validation/report-data/delete?id=${id}`);
}

/** 批量删除报表数据 */
export function deleteReportDataListByIds(ids: number[]) {
  return requestClient.delete(
    `/validation/report-data/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出报表数据 */
export function exportReportData(params: any) {
  return requestClient.download('/validation/report-data/export-excel', params);
}
