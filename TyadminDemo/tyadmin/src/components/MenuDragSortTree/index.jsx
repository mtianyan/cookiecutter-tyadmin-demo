import {Button, Input, Tree} from 'antd';
import React from 'react';
import {DownOutlined} from '@ant-design/icons';
import {recursionChange} from '@/utils/utils';
const { Search } = Input;
import debounce from 'lodash/debounce';
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};


class DragTree extends React.Component {

  constructor(props) {
    super(props);
    const gData = [
      {
        "id": 5,
        "key": "/xadmin/index",
        "title": "首页",
        "children": [],
        "name": "首页",
        "path": "/xadmin/index",
        "icon": "dashboard",
        "component": "./AutoGenPage/DashBoard",
        "parent_menu": null
      },
      {
        "id": 6,
        "key": "/xadmin/lessson",
        "title": "课程管理",
        "children": [
          {
            "id": 7,
            "key": "/xadmin/lessson/label_type",
            "title": "课程方向",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "课程方向",
            "path": "/xadmin/lessson/label_type",
            "icon": "smile",
            "component": "./AutoGenPage/LabelTypeList",
            "parent_menu": 6
          },
          {
            "id": 8,
            "key": "/xadmin/lessson/label",
            "title": "课程分类",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "课程分类",
            "path": "/xadmin/lessson/label",
            "icon": "smile",
            "component": "./AutoGenPage/LabelList",
            "parent_menu": 6
          },
          {
            "id": 9,
            "key": "/xadmin/lessson/lesson_type",
            "title": "课程类型",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "课程类型",
            "path": "/xadmin/lessson/lesson_type",
            "icon": "smile",
            "component": "./AutoGenPage/LessonTypeList",
            "parent_menu": 6
          },
          {
            "id": 10,
            "key": "/xadmin/lessson/lesson",
            "title": "课程本课",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "课程本课",
            "path": "/xadmin/lessson/lesson",
            "icon": "smile",
            "component": "./AutoGenPage/LessonList",
            "parent_menu": 6
          },
          {
            "id": 11,
            "key": "/xadmin/lessson/chapter",
            "title": "课程章节",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "课程章节",
            "path": "/xadmin/lessson/chapter",
            "icon": "smile",
            "component": "./AutoGenPage/ChapterList",
            "parent_menu": 6
          },
          {
            "id": 12,
            "key": "/xadmin/lessson/term",
            "title": "章节小节",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "章节小节",
            "path": "/xadmin/lessson/term",
            "icon": "smile",
            "component": "./AutoGenPage/TermList",
            "parent_menu": 6
          },
          {
            "id": 13,
            "key": "/xadmin/lessson/catalog",
            "title": "课程简介",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "课程简介",
            "path": "/xadmin/lessson/catalog",
            "icon": "smile",
            "component": "./AutoGenPage/CatalogList",
            "parent_menu": 6
          },
          {
            "id": 14,
            "key": "/xadmin/lessson/comment",
            "title": "课程评论",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "课程评论",
            "path": "/xadmin/lessson/comment",
            "icon": "smile",
            "component": "./AutoGenPage/CommentList",
            "parent_menu": 6
          },
          {
            "id": 15,
            "key": "/xadmin/lessson/qa",
            "title": "课程提问",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "课程提问",
            "path": "/xadmin/lessson/qa",
            "icon": "smile",
            "component": "./AutoGenPage/QaList",
            "parent_menu": 6
          },
          {
            "id": 16,
            "key": "/xadmin/lessson/qa_type",
            "title": "问题状态",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "问题状态",
            "path": "/xadmin/lessson/qa_type",
            "icon": "smile",
            "component": "./AutoGenPage/QaTypeList",
            "parent_menu": 6
          },
          {
            "id": 17,
            "key": "/xadmin/lessson/lesson_hard_type",
            "title": "课程难度",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "课程难度",
            "path": "/xadmin/lessson/lesson_hard_type",
            "icon": "smile",
            "component": "./AutoGenPage/LessonHardTypeList",
            "parent_menu": 6
          },
          {
            "id": 18,
            "key": "/xadmin/lessson/lesson_script",
            "title": "课程角标",
            "parent_menu_text": "课程管理",
            "children": [],
            "name": "课程角标",
            "path": "/xadmin/lessson/lesson_script",
            "icon": "smile",
            "component": "./AutoGenPage/LessonScriptList",
            "parent_menu": 6
          }
        ],
        "name": "课程管理",
        "path": "/xadmin/lessson",
        "icon": "VideoCamera",
        "component": "",
        "parent_menu": null
      },
      {
        "id": 19,
        "key": "/xadmin/read",
        "title": "专栏管理",
        "children": [
          {
            "id": 20,
            "key": "/xadmin/read/read_type",
            "title": "专栏分类",
            "parent_menu_text": "专栏管理",
            "children": [],
            "name": "专栏分类",
            "path": "/xadmin/read/read_type",
            "icon": "smile",
            "component": "./AutoGenPage/ReadTypeList",
            "parent_menu": 19
          },
          {
            "id": 21,
            "key": "/xadmin/read/read_chapter",
            "title": "专栏章节",
            "parent_menu_text": "专栏管理",
            "children": [],
            "name": "专栏章节",
            "path": "/xadmin/read/read_chapter",
            "icon": "smile",
            "component": "./AutoGenPage/ReadChapterList",
            "parent_menu": 19
          },
          {
            "id": 22,
            "key": "/xadmin/read/read_chapter_item",
            "title": "章节子节",
            "parent_menu_text": "专栏管理",
            "children": [],
            "name": "章节子节",
            "path": "/xadmin/read/read_chapter_item",
            "icon": "smile",
            "component": "./AutoGenPage/ReadChapterItemList",
            "parent_menu": 19
          }
        ],
        "name": "专栏管理",
        "path": "/xadmin/read",
        "icon": "book",
        "component": "",
        "parent_menu": null
      },
      {
        "id": 23,
        "key": "/xadmin/qa",
        "title": "猿问管理",
        "children": [
          {
            "id": 24,
            "key": "/xadmin/qa/question",
            "title": "问题列表",
            "parent_menu_text": "猿问管理",
            "children": [],
            "name": "问题列表",
            "path": "/xadmin/qa/question",
            "icon": "smile",
            "component": "./AutoGenPage/QuestionList",
            "parent_menu": 23
          },
          {
            "id": 25,
            "key": "/xadmin/qa/label_follow",
            "title": "关注标签",
            "parent_menu_text": "猿问管理",
            "children": [],
            "name": "关注标签",
            "path": "/xadmin/qa/label_follow",
            "icon": "smile",
            "component": "./AutoGenPage/LabelFollowList",
            "parent_menu": 23
          },
          {
            "id": 26,
            "key": "/xadmin/qa/answer",
            "title": "回答列表",
            "parent_menu_text": "猿问管理",
            "children": [],
            "name": "回答列表",
            "path": "/xadmin/qa/answer",
            "icon": "smile",
            "component": "./AutoGenPage/AnswerList",
            "parent_menu": 23
          }
        ],
        "name": "猿问管理",
        "path": "/xadmin/qa",
        "icon": "QuestionCircle",
        "component": "",
        "parent_menu": null
      },
      {
        "id": 27,
        "key": "/xadmin/article",
        "title": "手记管理",
        "children": [
          {
            "id": 28,
            "key": "/xadmin/article/article",
            "title": "文章列表",
            "parent_menu_text": "手记管理",
            "children": [],
            "name": "文章列表",
            "path": "/xadmin/article/article",
            "icon": "smile",
            "component": "./AutoGenPage/ArticleList",
            "parent_menu": 27
          },
          {
            "id": 29,
            "key": "/xadmin/article/article_type",
            "title": "文章类型",
            "parent_menu_text": "手记管理",
            "children": [],
            "name": "文章类型",
            "path": "/xadmin/article/article_type",
            "icon": "smile",
            "component": "./AutoGenPage/ArticleTypeList",
            "parent_menu": 27
          }
        ],
        "name": "手记管理",
        "path": "/xadmin/article",
        "icon": "PaperClip",
        "component": "",
        "parent_menu": null
      },
      {
        "id": 30,
        "key": "/xadmin/coupon",
        "title": "优惠管理",
        "children": [
          {
            "id": 31,
            "key": "/xadmin/coupon/coupon",
            "title": "优惠券码",
            "parent_menu_text": "优惠管理",
            "children": [],
            "name": "优惠券码",
            "path": "/xadmin/coupon/coupon",
            "icon": "smile",
            "component": "./AutoGenPage/CouponList",
            "parent_menu": 30
          },
          {
            "id": 32,
            "key": "/xadmin/coupon/coupon_status",
            "title": "优惠状态",
            "parent_menu_text": "优惠管理",
            "children": [],
            "name": "优惠状态",
            "path": "/xadmin/coupon/coupon_status",
            "icon": "smile",
            "component": "./AutoGenPage/CouponStatusList",
            "parent_menu": 30
          },
          {
            "id": 33,
            "key": "/xadmin/coupon/coupon_range",
            "title": "优惠范围",
            "parent_menu_text": "优惠管理",
            "children": [],
            "name": "优惠范围",
            "path": "/xadmin/coupon/coupon_range",
            "icon": "smile",
            "component": "./AutoGenPage/CouponRangeList",
            "parent_menu": 30
          }
        ],
        "name": "优惠管理",
        "path": "/xadmin/coupon",
        "icon": "MoneyCollect",
        "component": "",
        "parent_menu": null
      },
      {
        "id": 34,
        "key": "/xadmin/order",
        "title": "订单管理",
        "children": [
          {
            "id": 35,
            "key": "/xadmin/order/cart",
            "title": "购物车车",
            "parent_menu_text": "订单管理",
            "children": [],
            "name": "购物车车",
            "path": "/xadmin/order/cart",
            "icon": "smile",
            "component": "./AutoGenPage/CartList",
            "parent_menu": 34
          },
          {
            "id": 36,
            "key": "/xadmin/order/order",
            "title": "订单列表",
            "parent_menu_text": "订单管理",
            "children": [],
            "name": "订单列表",
            "path": "/xadmin/order/order",
            "icon": "smile",
            "component": "./AutoGenPage/OrderList",
            "parent_menu": 34
          },
          {
            "id": 37,
            "key": "/xadmin/order/order_item",
            "title": "订单子项",
            "parent_menu_text": "订单管理",
            "children": [],
            "name": "订单子项",
            "path": "/xadmin/order/order_item",
            "icon": "smile",
            "component": "./AutoGenPage/OrderItemList",
            "parent_menu": 34
          },
          {
            "id": 38,
            "key": "/xadmin/order/order_status",
            "title": "订单状态",
            "parent_menu_text": "订单管理",
            "children": [],
            "name": "订单状态",
            "path": "/xadmin/order/order_status",
            "icon": "smile",
            "component": "./AutoGenPage/OrderStatusList",
            "parent_menu": 34
          }
        ],
        "name": "订单管理",
        "path": "/xadmin/order",
        "icon": "OrderedList",
        "component": "",
        "parent_menu": null
      },
      {
        "id": 39,
        "key": "/xadmin/pay",
        "title": "充值管理",
        "children": [
          {
            "id": 40,
            "key": "/xadmin/pay/recharge",
            "title": "充值记录",
            "parent_menu_text": "充值管理",
            "children": [],
            "name": "充值记录",
            "path": "/xadmin/pay/recharge",
            "icon": "smile",
            "component": "./AutoGenPage/RechargeList",
            "parent_menu": 39
          },
          {
            "id": 41,
            "key": "/xadmin/pay/recharge_action",
            "title": "充值类型",
            "parent_menu_text": "充值管理",
            "children": [],
            "name": "充值类型",
            "path": "/xadmin/pay/recharge_action",
            "icon": "smile",
            "component": "./AutoGenPage/RechargeActionList",
            "parent_menu": 39
          },
          {
            "id": 42,
            "key": "/xadmin/pay/recharge_pay",
            "title": "充值方式",
            "parent_menu_text": "充值管理",
            "children": [],
            "name": "充值方式",
            "path": "/xadmin/pay/recharge_pay",
            "icon": "smile",
            "component": "./AutoGenPage/RechargePayList",
            "parent_menu": 39
          }
        ],
        "name": "充值管理",
        "path": "/xadmin/pay",
        "icon": "PayCircle",
        "component": "",
        "parent_menu": null
      },
      {
        "id": 43,
        "key": "/xadmin/user",
        "title": "用户管理",
        "children": [
          {
            "id": 44,
            "key": "/xadmin/user/teacher",
            "title": "课程讲师",
            "parent_menu_text": "用户管理",
            "children": [],
            "name": "课程讲师",
            "path": "/xadmin/user/teacher",
            "icon": "smile",
            "component": "./AutoGenPage/TeacherList",
            "parent_menu": 43
          },
          {
            "id": 45,
            "key": "/xadmin/user/student_type",
            "title": "学生类型",
            "parent_menu_text": "用户管理",
            "children": [],
            "name": "学生类型",
            "path": "/xadmin/user/student_type",
            "icon": "smile",
            "component": "./AutoGenPage/StudentTypeList",
            "parent_menu": 43
          },
          {
            "id": 46,
            "key": "/xadmin/user/student",
            "title": "学生列表",
            "parent_menu_text": "用户管理",
            "children": [],
            "name": "学生列表",
            "path": "/xadmin/user/student",
            "icon": "smile",
            "component": "./AutoGenPage/StudentList",
            "parent_menu": 43
          }
        ],
        "name": "用户管理",
        "path": "/xadmin/user",
        "icon": "UsergroupAdd",
        "component": "",
        "parent_menu": null
      },
      {
        "id": 47,
        "key": "/xadmin/integral/",
        "title": "积分商城",
        "children": [
          {
            "id": 48,
            "key": "/xadmin/integral/integral_type",
            "title": "商品类别",
            "parent_menu_text": "积分商城",
            "children": [],
            "name": "商品类别",
            "path": "/xadmin/integral/integral_type",
            "icon": "smile",
            "component": "./AutoGenPage/IntegralTypeList",
            "parent_menu": 47
          },
          {
            "id": 49,
            "key": "/xadmin/integral/integral",
            "title": "积分商品",
            "parent_menu_text": "积分商城",
            "children": [],
            "name": "积分商品",
            "path": "/xadmin/integral/integral",
            "icon": "smile",
            "component": "./AutoGenPage/IntegralList",
            "parent_menu": 47
          }
        ],
        "name": "积分商城",
        "path": "/xadmin/integral/",
        "icon": "Shop",
        "component": "",
        "parent_menu": null
      },
      {
        "id": 50,
        "key": "/xadmin/user_info",
        "title": "用户中心",
        "children": [
          {
            "id": 51,
            "key": "/xadmin/user_info/user_lesson",
            "title": "学习课程",
            "parent_menu_text": "用户中心",
            "children": [],
            "name": "学习课程",
            "path": "/xadmin/user_info/user_lesson",
            "icon": "smile",
            "component": "./AutoGenPage/UserLessonList",
            "parent_menu": 50
          },
          {
            "id": 52,
            "key": "/xadmin/user_info/user_notice",
            "title": "用户通知",
            "parent_menu_text": "用户中心",
            "children": [],
            "name": "用户通知",
            "path": "/xadmin/user_info/user_notice",
            "icon": "smile",
            "component": "./AutoGenPage/UserNoticeList",
            "parent_menu": 50
          },
          {
            "id": 53,
            "key": "/xadmin/user_info/history",
            "title": "搜索历史",
            "parent_menu_text": "用户中心",
            "children": [],
            "name": "搜索历史",
            "path": "/xadmin/user_info/history",
            "icon": "smile",
            "component": "./AutoGenPage/HistoryList",
            "parent_menu": 50
          },
          {
            "id": 54,
            "key": "/xadmin/user_info/consult",
            "title": "用户咨询",
            "parent_menu_text": "用户中心",
            "children": [],
            "name": "用户咨询",
            "path": "/xadmin/user_info/consult",
            "icon": "smile",
            "component": "./AutoGenPage/ConsultList",
            "parent_menu": 50
          },
          {
            "id": 55,
            "key": "/xadmin/user_info/bill",
            "title": "购买账单",
            "parent_menu_text": "用户中心",
            "children": [],
            "name": "购买账单",
            "path": "/xadmin/user_info/bill",
            "icon": "smile",
            "component": "./AutoGenPage/BillList",
            "parent_menu": 50
          },
          {
            "id": 56,
            "key": "/xadmin/user_info/address",
            "title": "地址信息",
            "parent_menu_text": "用户中心",
            "children": [],
            "name": "地址信息",
            "path": "/xadmin/user_info/address",
            "icon": "smile",
            "component": "./AutoGenPage/AddressList",
            "parent_menu": 50
          },
          {
            "id": 57,
            "key": "/xadmin/user_info/log_type",
            "title": "登录类型",
            "parent_menu_text": "用户中心",
            "children": [],
            "name": "登录类型",
            "path": "/xadmin/user_info/log_type",
            "icon": "smile",
            "component": "./AutoGenPage/LogTypeList",
            "parent_menu": 50
          },
          {
            "id": 58,
            "key": "/xadmin/user_info/log",
            "title": "登录日志",
            "parent_menu_text": "用户中心",
            "children": [],
            "name": "登录日志",
            "path": "/xadmin/user_info/log",
            "icon": "smile",
            "component": "./AutoGenPage/LogList",
            "parent_menu": 50
          }
        ],
        "name": "用户中心",
        "path": "/xadmin/user_info",
        "icon": "user",
        "component": "",
        "parent_menu": null
      },
      {
        "id": 59,
        "key": "/xadmin/home",
        "title": "首页管理",
        "children": [
          {
            "id": 60,
            "key": "/xadmin/home/slider",
            "title": "首页大图",
            "parent_menu_text": "首页管理",
            "children": [],
            "name": "首页大图",
            "path": "/xadmin/home/slider",
            "icon": "smile",
            "component": "./AutoGenPage/SliderList",
            "parent_menu": 59
          },
          {
            "id": 61,
            "key": "/xadmin/home/navigation",
            "title": "首页菜单",
            "parent_menu_text": "首页管理",
            "children": [],
            "name": "首页菜单",
            "path": "/xadmin/home/navigation",
            "icon": "smile",
            "component": "./AutoGenPage/NavigationList",
            "parent_menu": 59
          },
          {
            "id": 62,
            "key": "/xadmin/home/common_path_config",
            "title": "公共配置",
            "parent_menu_text": "首页管理",
            "children": [],
            "name": "公共配置",
            "path": "/xadmin/home/common_path_config",
            "icon": "smile",
            "component": "./AutoGenPage/CommonPathConfigList",
            "parent_menu": 59
          },
          {
            "id": 63,
            "key": "/xadmin/home/nav",
            "title": "首页导航",
            "parent_menu_text": "首页管理",
            "children": [],
            "name": "首页导航",
            "path": "/xadmin/home/nav",
            "icon": "smile",
            "component": "./AutoGenPage/NavList",
            "parent_menu": 59
          },
          {
            "id": 64,
            "key": "/xadmin/home/footer",
            "title": "底部配置",
            "parent_menu_text": "首页管理",
            "children": [],
            "name": "底部配置",
            "path": "/xadmin/home/footer",
            "icon": "smile",
            "component": "./AutoGenPage/FooterList",
            "parent_menu": 59
          }
        ],
        "name": "首页管理",
        "path": "/xadmin/home",
        "icon": "setting",
        "component": "",
        "parent_menu": null
      },
      {
        "id": 65,
        "key": "/xadmin/sys",
        "title": "系统管理",
        "children": [
          {
            "id": 66,
            "key": "/xadmin/sys/sys_log",
            "title": "系统日志",
            "parent_menu_text": "系统管理",
            "children": [],
            "name": "系统日志",
            "path": "/xadmin/sys/sys_log",
            "icon": "smile",
            "component": "./AutoGenPage/SysLogList",
            "parent_menu": 65
          },
          {
            "id": 67,
            "key": "/xadmin/sys/hot",
            "title": "热搜榜单",
            "parent_menu_text": "系统管理",
            "children": [],
            "name": "热搜榜单",
            "path": "/xadmin/sys/hot",
            "icon": "smile",
            "component": "./AutoGenPage/HotList",
            "parent_menu": 65
          },
          {
            "id": 68,
            "key": "/xadmin/sys/notice",
            "title": "系统通知",
            "parent_menu_text": "系统管理",
            "children": [],
            "name": "系统通知",
            "path": "/xadmin/sys/notice",
            "icon": "smile",
            "component": "./AutoGenPage/NoticeList",
            "parent_menu": 65
          },
          {
            "id": 69,
            "key": "/xadmin/sys/user",
            "title": "系统用户",
            "parent_menu_text": "系统管理",
            "children": [],
            "name": "系统用户",
            "path": "/xadmin/sys/user",
            "icon": "smile",
            "component": "./AutoGenPage/UserList",
            "parent_menu": 65
          }
        ],
        "name": "系统管理",
        "path": "/xadmin/sys",
        "icon": "setting",
        "component": "",
        "parent_menu": null
      }
    ];
    recursionChange(gData, (one) => {
      // one.icon = <DynamicIcon type={one.icon}/>
      console.log('xxone', one);
      // one.icon = <DynamicIcon type={one.icon}/>
    });
    console.log('gDdata', gData);
    const dataList = [];
    const generateList = data => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key, title } = node;
        dataList.push({ key, title: title });
        if (node.children) {
          generateList(node.children);
        }
      }
    };
    generateList(gData);
    this.state = {
      gData,
      dataList,
      searchValue: '',
      autoExpandParent: false,
      expandedKeys: [],
    };
  }



  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onDragEnter = info => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  onChange = e => {
    const { value } = e.target;
    console.log("value", value)
    if(value === ""){
      console.log(value)
      this.setState({
        expandedKeys: [],
        searchValue: value,
      })
      return
    }
    console.log(this.state.dataList)
    const expandedKeys = this.state.dataList.map(item => {
        if (item.title.indexOf(value) > -1) {
          console.log("title-in", item)
          let res =getParentKey(item.key, this.state.gData);
          console.log(res)
          return res
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    console.log("expandedKeys", expandedKeys)
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  onDrop = info => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    console.log(data)
    this.setState({
      gData: data,
    });
  };

  render() {
    const { searchValue, expandedKeys } = this.state;
    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return { title, key: item.key, icon: item.icon, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });
    return (
      <>

        <Search size='middle' style={{marginBottom: 8}} placeholder="搜索菜单" onChange={this.onChange} />
        <Tree
          showIcon
          className="draggable-tree"
          expandedKeys={expandedKeys}
          draggable
          blockNode
          onExpand={this.onExpand}
          switcherIcon={<DownOutlined />}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
          treeData={loop(this.state.gData)}
        />
      </>
    );
  }
}

export default DragTree;
