import request from 'umi-request';

export async function queryTyAdminMenuConfig(params) {
  return request('/api/xadmin/v1/ty_admin_menu_config', {
    params,
  });
}
export async function removeTyAdminMenuConfig(params) {
  return request(`/api/xadmin/v1/ty_admin_menu_config/${params}`, {
    method: 'DELETE',
  });
}
export async function addTyAdminMenuConfig(params) {
  return request('/api/xadmin/v1/ty_admin_menu_config', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateTyAdminMenuConfig(params, id) {
  return request(`/api/xadmin/v1/ty_admin_menu_config/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}
