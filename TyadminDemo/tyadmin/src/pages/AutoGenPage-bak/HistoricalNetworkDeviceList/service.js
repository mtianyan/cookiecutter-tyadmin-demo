import request from 'umi-request';

export async function queryHistoricalNetworkDevice(params) {
  return request('/api/xadmin/v1/historical_network_device', {
    params,
  });
}
export async function removeHistoricalNetworkDevice(params) {
  return request(`/api/xadmin/v1/historical_network_device/${params}`, {
    method: 'DELETE',
  });
}
export async function addHistoricalNetworkDevice(params) {
  return request('/api/xadmin/v1/historical_network_device', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateHistoricalNetworkDevice(params, id) {
  return request(`/api/xadmin/v1/historical_network_device/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}
