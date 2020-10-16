import request from 'umi-request';

export async function queryBgqInfo(params) {
  return request('/api/xadmin/v1/bgq_info', {
    params,
  });
}
export async function removeBgqInfo(params) {
  return request(`/api/xadmin/v1/bgq_info/${params}`, {
    method: 'DELETE',
  });
}
export async function addBgqInfo(params) {
  return request('/api/xadmin/v1/bgq_info', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateBgqInfo(params, id) {
  return request(`/api/xadmin/v1/bgq_info/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}
