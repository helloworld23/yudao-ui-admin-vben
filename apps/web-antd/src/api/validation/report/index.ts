import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace ReportApi {
  /** 报表定义信息 */
  export interface Report {
    id: number; // 主键
    name?: string; // 名字
    code: string; // 编码
    file: string; // 文件
    description: string; // 描述
    status: number; // 状态
  }
}

/** 查询报表定义分页 */
export function getReportPage(params: PageParam) {
  return requestClient.get<PageResult<ReportApi.Report>>(
    '/validation/report/page',
    { params },
  );
}

/** 查询报表定义详情 */
export function getReport(id: number) {
  return requestClient.get<ReportApi.Report>(`/validation/report/get?id=${id}`);
}

/** 新增报表定义 */
export function createReport(data: ReportApi.Report) {
  return requestClient.post('/validation/report/create', data);
}

/** 修改报表定义 */
export function updateReport(data: ReportApi.Report) {
  return requestClient.put('/validation/report/update', data);
}

/** 删除报表定义 */
export function deleteReport(id: number) {
  return requestClient.delete(`/validation/report/delete?id=${id}`);
}

/** 批量删除报表定义 */
export function deleteReportListByIds(ids: number[]) {
  return requestClient.delete(
    `/validation/report/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出报表定义 */
export function exportReport(params: any) {
  return requestClient.download('/validation/report/export-excel', params);
}
