import {DownOutlined, PlusOutlined, EditOutlined,DeleteOutlined} from '@ant-design/icons';
import {Button, Divider, Dropdown, Input, Menu, message, Popconfirm, Select, Switch, Tag, Space} from 'antd';
import React, {useEffect,useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from 'mtianyan-pro-table';
import CreateForm from './components/CreateForm';
import {addHistoricalNetworkDevice, queryHistoricalNetworkDevice, removeHistoricalNetworkDevice, updateHistoricalNetworkDevice} from './service';
import UpdateForm from './components/UpdateForm';
import UploadAvatar from '@/components/UploadAvatar';
import {queryBgqInfo} from '@/pages/AutoGenPage/BgqInfoList/service';import {queryUserInfo} from '@/pages/AutoGenPage/UserInfoList/service';
import moment from 'moment';
const {Option} = Select;
import {BooleanDisplay, dealDateTimeDisplay, dealTime, deepCopy, getObjectClass, getTableColumns, richForm, richTrans, richCol,fileUpload} from '@/utils/utils';
import 'braft-editor/dist/index.css'

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef();
  const addFormRef = useRef();
  const updateFormRef = useRef();

  const handleAdd = async fields => {
  const hide = message.loading('正在添加');

  try {
    await addHistoricalNetworkDevice({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
      if ('fields_errors' in error.data) {
        for (let key in error.data.fields_errors) {
          var value = error.data.fields_errors[key];
          addFormRef.current.setFields([
            {
              name: key,
              errors: value,
            },
          ]);
        }
      } else {
        message.error('非字段类型错误');
      }
    hide();
    message.error('添加失败');
    return false;
  }
};

  const handleUpdate = async (value, current_id) => {
  const hide = message.loading('正在修改');

  try {
    await updateHistoricalNetworkDevice(value, current_id);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
            if ('fields_errors' in error.data) {
        for (let key in error.data.fields_errors) {
          var value = error.data.fields_errors[key];
          updateFormRef.current.setFields([
            {
              name: key,
              errors: value,
            },
          ]);
        }
      } else {
        message.error('非字段类型错误');
      }
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

  const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    const ids = selectedRows.map(row => row.id).join(',');
    await removeHistoricalNetworkDevice(ids);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
  const dateFieldList = ["history_date"]
  const base_columns = [{
                                  title: 'ID',
                                  dataIndex: 'id',
                                  hideInForm: true,
                                  hideInSearch: true,
                                  rules: [
                                    {
                                      required: true,
                                      message: 'ID为必填项',
                                    },
                                  ],
                                },{
                                           title: '设备状态',
                                           dataIndex: 'status',
                                           rules: [
                                             {
                                               required: true,
                                               message: '设备状态为必填项',
                                             },
                                           ],
                                           valueEnum: {
                                             "0":"在线","1":"离线"
                                            },
                                         },{
                      title: '设备名称',
                      dataIndex: 'name',
                      rules: [
                        {
                          required: true,
                          message: '设备名称为必填项',
                        },
                      ],
                    },{
                      title: '设备角色',
                      dataIndex: 'devicerole',
                      rules: [
                        {
                          required: true,
                          message: '设备角色为必填项',
                        },
                      ],
                    },{
                  title: '管理IP',
                  dataIndex: 'management_ip',
                  rules: [
                    {
                      required: true,
                      message: '管理IP为必填项',
                    },
                  ],
                },{
                      title: '制造商',
                      dataIndex: 'describe',
                      rules: [
                        {
                          required: true,
                          message: '制造商为必填项',
                        },
                      ],
                    },{
                      title: '设备型号',
                      dataIndex: 'model',
                      rules: [
                        {
                          required: true,
                          message: '设备型号为必填项',
                        },
                      ],
                    },{
                      title: '软件版本',
                      dataIndex: 'software',
                      rules: [
                        {
                          required: true,
                          message: '软件版本为必填项',
                        },
                      ],
                    },{
                      title: 'SN',
                      dataIndex: 'sn',
                      rules: [
                        {
                          required: true,
                          message: 'SN为必填项',
                        },
                      ],
                    },{
                              title: '办公区',
                              dataIndex: 'bgq',
                              backendType: 'foreignKey',
                              rules: [
                                {
                                  required: true,
                                  message: '办公区为必填项',
                                },
                              ],
                                    renderFormItem: (item, {value, onChange}) => {
            const children = bgqForeignKeyList.map((item) => {
              return <Option key={item.id} value={item.id}>{item.name}</Option>;
            });
            return <Select
              placeholder="请选择办公区"
              onChange={onChange}
            >
              {children}
            </Select>;
          },
                            },{
                              title: 'changed by',
                              dataIndex: 'changed_by',
                              backendType: 'foreignKey',
                              rules: [
                                {
                                  required: true,
                                  message: 'changed by为必填项',
                                },
                              ],
                                    renderFormItem: (item, {value, onChange}) => {
            const children = changed_byForeignKeyList.map((item) => {
              return <Option key={item.id} value={item.id}>{item.username}</Option>;
            });
            return <Select
              placeholder="请选择changed by"
              onChange={onChange}
            >
              {children}
            </Select>;
          },
                            },{
                                      title: 'history id',
                                      dataIndex: 'history_id',
                                                valueType: 'digit',
                                      rules: [
                                        {
                                          required: true,
                                          message: 'history id为必填项',
                                        },
                                      ],
                                    },{
              title: 'history date',
              dataIndex: 'history_date',
              valueType: 'dateTime',
              
              rules: [
                {
                  required: true,
                  message: 'history date为必填项',
                },
              ],
                                       render: (text, record) => {
          return dealDateTimeDisplay(text);
        },
            },{
                      title: 'history change reason',
                      dataIndex: 'history_change_reason',
                      rules: [
                        {
                          required: true,
                          message: 'history change reason为必填项',
                        },
                      ],
                    },{
                                           title: 'history type',
                                           dataIndex: 'history_type',
                                           rules: [
                                             {
                                               required: true,
                                               message: 'history type为必填项',
                                             },
                                           ],
                                           valueEnum: {
                                             "+":"Created","~":"Changed","-":"Deleted"
                                            },
                                         },{
                              title: 'history user',
                              dataIndex: 'history_user',
                              backendType: 'foreignKey',
                              rules: [
                                {
                                  required: true,
                                  message: 'history user为必填项',
                                },
                              ],
                                    renderFormItem: (item, {value, onChange}) => {
            const children = history_userForeignKeyList.map((item) => {
              return <Option key={item.id} value={item.id}>{item.username}</Option>;
            });
            return <Select
              placeholder="请选择history user"
              onChange={onChange}
            >
              {children}
            </Select>;
          },
                            },    {
                              title: '操作',
                              dataIndex: 'option',
                              valueType: 'option',
                                    fixed: 'right',
          width: 100,
                              render: (text, record) => (
                                <>
    
                                  <EditOutlined title="编辑" className="icon" onClick={async () => {
                                    record.history_date = moment(record.history_date);
                                    handleUpdateModalVisible(true);
                                    setUpdateFormValues(record);
                                  }} />
                                  <Divider type="vertical" />
                                  <Popconfirm
                                    title="您确定要删除historical 设备资产吗？"
                                    placement="topRight"
                                    onConfirm={() => {
                                      handleRemove([record])
                                      actionRef.current.reloadAndRest();
                                    }}
                                    okText="确定"
                                    cancelText="取消"
                                  >
                                    <DeleteOutlined title="删除" className="icon" />
                                  </Popconfirm>
                                </>
                              ),
                            },];

  let cp = deepCopy(base_columns);
  const table_columns = getTableColumns(cp);

  const update_columns = [...base_columns];

  const create_columns = [...base_columns];

  const [columnsStateMap, setColumnsStateMap] = useState({});

  const [paramState, setParamState] = useState({});

  const [bgqForeignKeyList, setBgqForeignKeyList] = useState([]);
      useEffect(() => {
        queryBgqInfo().then(value => {
          setBgqForeignKeyList(value.data);
        });
      }, []);const [changed_byForeignKeyList, setChanged_byForeignKeyList] = useState([]);
      useEffect(() => {
        queryUserInfo().then(value => {
          setChanged_byForeignKeyList(value.data);
        });
      }, []);const [history_userForeignKeyList, setHistory_userForeignKeyList] = useState([]);
      useEffect(() => {
        queryUserInfo().then(value => {
          setHistory_userForeignKeyList(value.data);
        });
      }, []);


    
  return (
    <PageHeaderWrapper>
      <ProTable
           beforeSearchSubmit={(params => {
                         dealTime(params, dateFieldList);
          return params;
        })}
        params={paramState}
        scroll={{x: '100%'}}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={(map) => setColumnsStateMap(map)}
        headerTitle="historical 设备资产表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, {selectedRows}) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Input.Search style={{marginRight: 20}} placeholder="搜索historical 设备资产 " onSearch={value => {
            setParamState({
              search: value,
            });
            actionRef.current.reload();
          }} />,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      actionRef.current.reloadAndRest();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({selectedRowKeys, selectedRows}) => (
          selectedRowKeys.length > 0 ? <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
          </div> : false

        )}
        request={(params, sorter, filter) => queryHistoricalNetworkDevice({...params, sorter, filter})}
        columns={table_columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
                     formRef={addFormRef}
          onSubmit={async value => {
                          richTrans(value);
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
                    search={{
                                span: {
                                  lg: 12,
                                  md: 12,
                                  xxl: 12,
                                  xl: 12,
                                  sm: 12,
                                  xs: 24,
                                },
                              }}
          form={
            {
              labelCol: {span: 6},
              labelAlign: 'left',
            }}
          columns={create_columns}
          rowSelection={{}}
        />
      </CreateForm>
      <UpdateForm onCancel={() => handleUpdateModalVisible(false)} modalVisible={updateModalVisible}>
        <ProTable
          formRef={updateFormRef}
          onSubmit={async value => {
                          richTrans(value);
            const success = await handleUpdate(value, updateFormValues.id);

            if (success) {
              handleUpdateModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
                    search={{
                                span: {
                                  lg: 12,
                                  md: 12,
                                  xxl: 12,
                                  xl: 12,
                                  sm: 12,
                                  xs: 24,
                                },
                              }}
          type="form"
          form={{
            initialValues: updateFormValues, labelCol: {span: 6},
            labelAlign: 'left',
          }}
          columns={update_columns}
          rowSelection={{}}
        />
      </UpdateForm>
    </PageHeaderWrapper>
  );
};

export default TableList;
