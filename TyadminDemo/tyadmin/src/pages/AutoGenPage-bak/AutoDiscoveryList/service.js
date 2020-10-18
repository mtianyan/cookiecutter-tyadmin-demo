import request from 'umi-request';

export async function queryAutoDiscovery(params) {
  return request('/api/xadmin/v1/auto_discovery', {
    params,
  });
}
export async function removeAutoDiscovery(params) {
  return request(`/api/xadmin/v1/auto_discovery/${params}`, {
    method: 'DELETE',
  });
}
export async function addAutoDiscovery(params) {
  return request('/api/xadmin/v1/auto_discovery', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateAutoDiscovery(params, id) {
  return request(`/api/xadmin/v1/auto_discovery/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}
