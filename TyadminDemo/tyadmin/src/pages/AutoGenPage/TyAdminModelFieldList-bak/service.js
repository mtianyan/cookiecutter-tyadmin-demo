import request from 'umi-request';

export async function queryTyAdminModelField(params) {
  return request('/api/xadmin/v1/ty_admin_model_field', {
    params,
  });
}
export async function removeTyAdminModelField(params) {
  return request(`/api/xadmin/v1/ty_admin_model_field/${params}`, {
    method: 'DELETE',
  });
}
export async function addTyAdminModelField(params) {
  return request('/api/xadmin/v1/ty_admin_model_field', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateTyAdminModelField(params, id) {
  return request(`/api/xadmin/v1/ty_admin_model_field/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}
