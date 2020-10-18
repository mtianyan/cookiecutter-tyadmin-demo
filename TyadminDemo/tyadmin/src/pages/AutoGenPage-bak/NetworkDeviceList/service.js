import request from 'umi-request';

export async function queryNetworkDevice(params) {
  return request('/api/xadmin/v1/network_device', {
    params,
  });
}
export async function removeNetworkDevice(params) {
  return request(`/api/xadmin/v1/network_device/${params}`, {
    method: 'DELETE',
  });
}
export async function addNetworkDevice(params) {
  return request('/api/xadmin/v1/network_device', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateNetworkDevice(params, id) {
  return request(`/api/xadmin/v1/network_device/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}
