import {DownOutlined, PlusOutlined, EditOutlined,DeleteOutlined} from '@ant-design/icons';
import {Button, Divider, Dropdown, Input, Menu, message, Popconfirm, Select, Switch, Tag, Space, Col, Row, Card} from 'antd';
import React, {useEffect,useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from 'mtianyan-pro-table';
import CreateForm from './components/CreateForm';
import {addTyAdminMenuConfig, queryTyAdminMenuConfig, removeTyAdminMenuConfig, updateTyAdminMenuConfig} from './service';
import UpdateForm from './components/UpdateForm';
import UploadAvatar from '@/components/UploadAvatar';
import MenuDragSortTree from '@/components/MenuDragSortTree';
import EditTable from '@/components/EditTable';

import moment from 'moment';
const {Option} = Select;
import {BooleanDisplay, dealDateTimeDisplay, dealTime, deepCopy, getObjectClass, getTableColumns, richForm, richTrans, richCol,fileUpload} from '@/utils/utils';
import 'braft-editor/dist/index.css'
import EditableTable from '@/components/EditTable';
import IconDisplay from '@/components/IconDisplay';

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
    await addTyAdminMenuConfig({...fields});
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
    await updateTyAdminMenuConfig(value, current_id);
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
    await removeTyAdminMenuConfig(ids);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
  const dateFieldList = []
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
                      title: '菜单名称',
                      dataIndex: 'name',
                      rules: [
                        {
                          required: true,
                          message: '菜单名称为必填项',
                        },
                      ],
                    },{
                      title: '菜单路径',
                      dataIndex: 'path',
                      rules: [
                        {
                          required: true,
                          message: '菜单路径为必填项',
                        },
                      ],
                    },{
                      title: '菜单图标',
                      dataIndex: 'icon',
                      rules: [
                        {
                          required: true,
                          message: '菜单图标为必填项',
                        },
                      ],
                    },{
                      title: '菜单对应组件',
                      dataIndex: 'component',
                      rules: [
                        {
                          required: true,
                          message: '菜单对应组件为必填项',
                        },
                      ],
                    },{
                              title: '父级菜单',
                              dataIndex: 'parent_menu',
                              backendType: 'foreignKey',
                                    renderFormItem: (item, {value, onChange}) => {
            const children = parent_menuForeignKeyList.map((item) => {
              return <Option key={item.id} value={item.id}>{item.name}</Option>;
            });
            return <Select
              placeholder="请选择父级菜单"
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

                                    handleUpdateModalVisible(true);
                                    setUpdateFormValues(record);
                                  }} />
                                  <Divider type="vertical" />
                                  <Popconfirm
                                    title="您确定要删除ty admin menu config吗？"
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

  const [parent_menuForeignKeyList, setParent_menuForeignKeyList] = useState([]);
      useEffect(() => {
        queryTyAdminMenuConfig().then(value => {
          setParent_menuForeignKeyList(value.data);
        });
      }, []);



  return (
    <PageHeaderWrapper>
        <Row>
            <Col span={6} style={{paddingRight: 10}}>
                 <Card
                      title="菜单拖拽排序"
                      style={{
                          height: '100%',
                      }}
                      bodyStyle={{
                          padding: 0,
                      }}
                      extra={        <Button type={'primary'}>保存排序</Button>}
                    >
                        <MenuDragSortTree />
                 </Card>
            </Col>
            <Col span={18}>
              <EditableTable/>
            </Col>
        </Row>


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
