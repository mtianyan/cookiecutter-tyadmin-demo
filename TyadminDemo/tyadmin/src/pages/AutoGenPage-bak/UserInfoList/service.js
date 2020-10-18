import request from 'umi-request';
import {buildFileFormData} from '@/utils/utils'
export async function queryUserInfo(params) {
  return request('/api/xadmin/v1/user_info', {
    params,
  });
}
export async function removeUserInfo(params) {
  return request(`/api/xadmin/v1/user_info/${params}`, {
    method: 'DELETE',
  });
}
export async function addUserInfo(params) {
  let fileFieldList = ["image"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/user_info', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateUserInfo(params, id) {
  let fileFieldList = ["image"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/user_info/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
