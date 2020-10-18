import request from 'umi-request';

export async function queryTyAdminModelConfig(params) {
  return request('/api/xadmin/v1/ty_admin_model_config', {
    params,
  });
}
export async function removeTyAdminModelConfig(params) {
  return request(`/api/xadmin/v1/ty_admin_model_config/${params}`, {
    method: 'DELETE',
  });
}
export async function addTyAdminModelConfig(params) {
  return request('/api/xadmin/v1/ty_admin_model_config', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateTyAdminModelConfig(params, id) {
  return request(`/api/xadmin/v1/ty_admin_model_config/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}
