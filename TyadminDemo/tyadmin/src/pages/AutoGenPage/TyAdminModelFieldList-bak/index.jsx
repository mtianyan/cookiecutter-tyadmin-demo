import {DownOutlined, PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {
    Button,
    Divider,
    Dropdown,
    Input,
    Menu,
    message,
    Popconfirm,
    Select,
    Switch,
    Tag,
    Space,
    Row,
    Col,
    Card,
} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from 'mtianyan-pro-table';
import CreateForm from './components/CreateForm';
import {addTyAdminModelField, queryTyAdminModelField, removeTyAdminModelField, updateTyAdminModelField} from './service';
import UpdateForm from './components/UpdateForm';
import UploadAvatar from '@/components/UploadAvatar';
import {queryTyAdminModelConfig} from '@/pages/AutoGenPage/TyAdminModelConfigList/service';
import moment from 'moment';

const {Option} = Select;
import {
    BooleanDisplay,
    dealDateTimeDisplay,
    dealTime,
    deepCopy,
    getObjectClass,
    getTableColumns,
    richForm,
    richTrans,
    richCol,
    fileUpload
} from '@/utils/utils';
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
            await addTyAdminModelField({...fields});
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
            await updateTyAdminModelField(value, current_id);
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
            await removeTyAdminModelField(ids);
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
        hideInTable: true,
        rules: [
            {
                required: true,
                message: 'ID为必填项',
            },
        ],
    }, {
        title: '所属模型',
        dataIndex: 'model_name',
        backendType: 'foreignKey',
        hideInSearch: true,
        rules: [
            {
                required: true,
                message: '所属模型为必填项',
            },
        ],
        renderFormItem: (item, {value, onChange}) => {
            const children = model_nameForeignKeyList.map((item) => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>;
            });
            return <Select
                placeholder="请选择所属模型"
                onChange={onChange}
            >
                {children}
            </Select>;
        },
    }, {
        title: '字段名',
        dataIndex: 'name',
        rules: [
            {
                required: true,
                message: '字段名为必填项',
            },
        ],
    }, {
        title: '字段描述',
        dataIndex: 'desc',
        rules: [
            {
                required: true,
                message: '字段描述为必填项',
            },
        ],
    }, {
        title: '字段类型',
        dataIndex: 'type',
        rules: [
            {
                required: true,
                message: '字段类型为必填项',
            },
        ],
    }, {
        title: '字段帮助',
        dataIndex: 'help',
        valueType: 'textarea',
        ellipsis: true,
        rules: [
            {
                required: true,
                message: '字段帮助为必填项',
            },
        ],
    }, {
        title: '是否必填',
        dataIndex: 'require',
        rules: [
            {
                required: true,
                message: '是否必填为必填项',
            },
        ],
        render: (text, record) => {
            return BooleanDisplay(text);
        },
        renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
            const is_value = form.getFieldValue('require');
            if (type === "form" && !is_value) {
                form.setFieldsValue({'require': false});
            }
            return <Switch checked={is_value} onClick={(checked) => {
                form.setFieldsValue({'require': checked});
            }}/>;
        },
    }, {
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
                }}/>
                <Divider type="vertical"/>
                <Popconfirm
                    title="您确定要删除字段配置吗？"
                    placement="topRight"
                    onConfirm={() => {
                        handleRemove([record])
                        actionRef.current.reloadAndRest();
                    }}
                    okText="确定"
                    cancelText="取消"
                >
                    <DeleteOutlined title="删除" className="icon"/>
                </Popconfirm>
            </>
        ),
    },];

    let cp = deepCopy(base_columns);
    const table_columns = getTableColumns(cp);

    const model_columns = [{
        title: '模型名称',
        dataIndex: 'name',
        rules: [
            {
                required: true,
                message: '模型名称为必填项',
            },
        ],
    },{
        title: '模型备注',
        dataIndex: 'verbose_name',
        rules: [
            {
                required: true,
                message: '模型备注为必填项',
            },
        ],
    }];

    const update_columns = [...base_columns];

    const create_columns = [...base_columns];

    const [columnsStateMap, setColumnsStateMap] = useState({});

    const [paramState, setParamState] = useState({});

    const [model_nameForeignKeyList, setModel_nameForeignKeyList] = useState([]);
    useEffect(() => {
        queryTyAdminModelConfig().then(value => {
            setModel_nameForeignKeyList(value.data);
        });
    }, []);


    return (
        <PageHeaderWrapper>
            <Row>
                <Col span={6} style={{paddingRight: 10}}>
                    <Card
                      style={{
                          height: '100%',
                      }}
                      bodyStyle={{
                          padding: 0,
                      }}
                    >
                        <ProTable
                          beforeSearchSubmit={(params => {
                              dealTime(params, dateFieldList);
                              return params;
                          })}
                          params={paramState}
                          scroll={{x: '100%'}}
                          columnsStateMap={columnsStateMap}
                          onColumnsStateChange={(map) => setColumnsStateMap(map)}
                          headerTitle="字段配置表格"
                          actionRef={actionRef}
                          rowKey="id"
                          toolBarRender={false}
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
                          request={(params, sorter, filter) => queryTyAdminModelConfig({...params, sorter, filter})}
                          columns={model_columns}
                          rowSelection={false}
                          search={false}
                        />
                    </Card>
                </Col>

                <Col span={17}><ProTable
                  beforeSearchSubmit={(params => {
                      dealTime(params, dateFieldList);
                      return params;
                  })}
                  params={paramState}
                  scroll={{x: '100%'}}
                  columnsStateMap={columnsStateMap}
                  onColumnsStateChange={(map) => setColumnsStateMap(map)}
                  headerTitle="字段配置表格"
                  actionRef={actionRef}
                  rowKey="id"
                  toolBarRender={false}
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
                  request={(params, sorter, filter) => queryTyAdminModelField({...params, sorter, filter})}
                  columns={table_columns}
                  rowSelection={{}}
                /></Col>

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
