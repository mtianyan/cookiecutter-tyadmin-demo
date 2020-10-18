from datetime import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
from tyadmin_api_cli.contants import MAIN_AVATAR, MAIN_DISPLAY

from django.db import models
from simple_history.models import HistoricalRecords


class TyAdminSysRole(models.Model):
    role_name = models.CharField(max_length=128, verbose_name="角色名称")
    role_key = models.CharField(max_length=128, verbose_name="权限字符")
    role_sort = models.IntegerField(blank=True, null=True, verbose_name="角色顺序")
    status = models.BooleanField(default=True, verbose_name="状态")
    create_by = models.CharField(max_length=128, blank=True, null=True)
    update_by = models.CharField(max_length=128, blank=True, null=True)
    remark = models.CharField(max_length=255, blank=True, null=True, verbose_name="备注")
    data_scope = models.CharField(max_length=128, blank=True, null=True, verbose_name="权限范围")
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sys_role'
        ordering = ['pk']


class TyAdminSysMenu(models.Model):
    MENU_CHOICES = (
        ("directory", "目录"),
        ("menu", "菜单"),
        ("button", "按钮"),
        ("interface", "接口"),
    )
    parent_menu = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True, verbose_name="上级菜单", help_text=f"{MAIN_DISPLAY}__name")
    name = models.CharField(max_length=500, verbose_name="菜单标题", default="")
    sort = models.IntegerField(verbose_name="显示排序")
    menu_type = models.CharField(choices=MENU_CHOICES, max_length=30, blank=True, null=True)
    icon = models.CharField(max_length=500, verbose_name="菜单图标", default="")
    component = models.CharField(max_length=500, verbose_name="组件路径", default="")
    path = models.CharField(max_length=500, verbose_name="路由地址", default="", unique=True)
    visible = models.BooleanField(default=True, verbose_name="显示")
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)


class TyAdminSysDept(models.Model):
    parent_dept = models.ForeignKey("self", on_delete=models.CASCADE, verbose_name="上级部门", help_text=f"{MAIN_DISPLAY}__name")
    dept_name = models.CharField(verbose_name="部门名称", max_length=128)
    sort = models.IntegerField(verbose_name="显示排序")
    leader = models.CharField(max_length=128, verbose_name="负责人", blank=True, null=True)
    phone = models.CharField(max_length=11, verbose_name="联系电话", blank=True, null=True)
    email = models.CharField(max_length=64, verbose_name="邮箱", blank=True, null=True)
    status = models.BooleanField(default=True, verbose_name="部门状态")
    create_by = models.CharField(max_length=500, blank=True, null=True)
    update_by = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(default=datetime.now())
    updated_at = models.DateTimeField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = '部门管理'
        ordering = ['pk']


class SysConfig(models.Model):
    config_name = models.CharField(max_length=128, blank=True, null=True)
    config_key = models.CharField(max_length=128, blank=True, null=True)
    config_value = models.CharField(max_length=255, blank=True, null=True)
    config_type = models.CharField(max_length=64, blank=True, null=True)
    remark = models.CharField(max_length=128, blank=True, null=True)
    create_by = models.CharField(max_length=128, blank=True, null=True)
    update_by = models.CharField(max_length=128, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = ""


class TyAdminSysPost(models.Model):
    post_name = models.CharField(max_length=128, verbose_name="岗位名称")
    post_code = models.CharField(max_length=128, verbose_name="岗位编码")
    sort = models.IntegerField(default=0, verbose_name="岗位顺序")
    status = models.BooleanField(default=True, verbose_name="岗位状态")
    remark = models.CharField(max_length=255, blank=True, null=True, verbose_name="岗位备注")
    create_by = models.CharField(max_length=128, blank=True, null=True)
    update_by = models.CharField(max_length=128, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = '岗位管理'
        ordering = ['pk']


class TyAdminSysLoginLog(models.Model):
    username = models.CharField(max_length=128, verbose_name="用户名称")
    status = models.IntegerField(blank=True, null=True, verbose_name="登录状态")
    ipaddr = models.CharField(max_length=255, blank=True, null=True, verbose_name="登录地址")
    login_location = models.CharField(max_length=255, blank=True, verbose_name="登录地点")
    browser = models.CharField(max_length=255, blank=True, null=True, verbose_name="浏览器")
    os = models.CharField(max_length=255, blank=True, null=True, verbose_name="操作系统")
    platform = models.CharField(max_length=255, blank=True, null=True, verbose_name="系统平台")
    login_time = models.DateTimeField(blank=True, null=True, verbose_name="登录时间")
    create_by = models.CharField(max_length=128, blank=True, null=True)
    update_by = models.CharField(max_length=128, blank=True, null=True)
    remark = models.CharField(max_length=255, blank=True, null=True, verbose_name="备注")
    msg = models.CharField(max_length=255, blank=True, null=True, verbose_name="操作信息")
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = '登录日志'


class TyAdminSysModel(models.Model):
    name = models.CharField(max_length=500, verbose_name="模型名称", default="")
    verbose_name = models.CharField(max_length=500, blank=True, null=True, verbose_name="模型备注")

    class Meta:
        verbose_name = '模型配置'


class TyAdminSysModelField(models.Model):
    model_name = models.ForeignKey(TyAdminSysModel, on_delete=models.CASCADE, verbose_name="所属模型", help_text=f'{MAIN_DISPLAY}__name', null=True,
                                   blank=True)  # 外键
    name = models.CharField(max_length=500, verbose_name="字段名")
    desc = models.CharField(max_length=500, verbose_name="字段描述", default="")
    type = models.CharField(max_length=500, verbose_name="字段类型")
    help = models.TextField(max_length=500, verbose_name="字段帮助")
    require = models.BooleanField(default=True, verbose_name="是否必填")

    class Meta:
        verbose_name = '字段配置'


class BgqInfo(models.Model):
    """
    办公区属性
    办公区站点显示名称
    返回值作为其他参数的外键使用
    """
    name = models.CharField(max_length=128, default='NULL', verbose_name="办公区")
    address = models.CharField(max_length=128, default='NULL', verbose_name="办公区地址")
    contacts = models.CharField(max_length=128, default='NULL', verbose_name="联系人")
    mobel = models.CharField(max_length=128, default='NULL', verbose_name="联系电话")

    class Meta:
        verbose_name = '办公区'

    def __str__(self):
        return self.name


class AutoDiscovery(models.Model):
    management_network = models.CharField(max_length=128, unique=True, blank=True, null=True, verbose_name="IP地址段")
    bgq = models.ForeignKey(BgqInfo, on_delete=models.CASCADE, verbose_name="办公区", help_text=f'{MAIN_DISPLAY}__name')  # 外键

    class Meta:
        verbose_name = '自动发现'


class NetworkDevice(models.Model):
    """
    网络设备属性
    网络设备站点显示名称
    """
    asset_status = (
        (0, '在线'),
        (1, '离线'),
    )

    status = models.CharField(choices=asset_status, max_length=128, default=0, verbose_name='设备状态')
    bgq = models.ForeignKey(BgqInfo, on_delete=models.CASCADE, verbose_name="办公区", help_text=f'{MAIN_DISPLAY}__name')  # 外键
    name = models.CharField(max_length=128, default='NULL', verbose_name="设备名称")
    devicerole = models.CharField(max_length=128, default='NULL', verbose_name="设备角色")
    management_ip = models.CharField(max_length=128, default='NULL', verbose_name="管理IP")
    management_ip = models.GenericIPAddressField(blank=True, null=True, verbose_name="管理IP")
    describe = models.CharField(max_length=128, default='NULL', verbose_name="制造商")
    model = models.CharField(max_length=128, default='NULL', verbose_name="设备型号")
    software = models.CharField(max_length=128, default='NULL', verbose_name="软件版本")
    sn = models.CharField(max_length=128, default='NULL', verbose_name="SN")
    add_time = models.DateTimeField(auto_now_add=True, verbose_name="添加时间")
    modify_time = models.DateTimeField(auto_now=True, verbose_name="更新时间")
    changed_by = models.ForeignKey('UserInfo', null=True, blank=True, on_delete=models.SET_NULL, help_text=f'{MAIN_DISPLAY}__username')
    history = HistoricalRecords(excluded_fields=['add_time', 'modify_time'])  # cascade_delete_history=True

    class Meta:
        verbose_name = '设备资产'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.management_ip

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value


class UserInfo(AbstractUser):
    GENDER_CHOICES = (
        ("male", "男"),
        ("female", "女")
    )
    nick_name = models.CharField(max_length=128, blank=True, null=True, verbose_name="用户昵称")
    department = models.ForeignKey(TyAdminSysDept, verbose_name="归属部门", null=True, blank=True, on_delete=models.SET_NULL,
                                   help_text=f'{MAIN_DISPLAY}__name')
    phone = models.CharField(max_length=11, blank=True, null=True, verbose_name="手机号")
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default="female", verbose_name="性别")
    status = models.BooleanField(default=True, verbose_name="状态")
    post = models.ForeignKey(TyAdminSysPost, verbose_name="岗位", null=True, blank=True, on_delete=models.SET_NULL, help_text=f'{MAIN_DISPLAY}__name')
    role = models.ForeignKey(TyAdminSysPost, verbose_name="角色", null=True, blank=True, on_delete=models.SET_NULL, help_text=f'{MAIN_DISPLAY}__name')
    birthday = models.DateField(null=True, blank=True, verbose_name="出生年月")
    image = models.ImageField(upload_to="image/%Y/%m", max_length=100, verbose_name="头像", help_text=MAIN_AVATAR)
    remark = models.CharField(max_length=255, blank=True, null=True, verbose_name="备注")
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = "用户管理"
        verbose_name_plural = verbose_name
