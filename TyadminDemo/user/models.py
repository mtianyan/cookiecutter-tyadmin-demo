from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
from tyadmin_api_cli.contants import MAIN_AVATAR, MAIN_DISPLAY

from django.db import models
from simple_history.models import HistoricalRecords


class TyAdminMenuConfig(models.Model):
    name = models.CharField(max_length=500, verbose_name="菜单名称", default="")
    path = models.CharField(max_length=500, verbose_name="菜单路径", default="")
    icon = models.CharField(max_length=500, verbose_name="菜单图标", default="")
    component = models.CharField(max_length=500, verbose_name="菜单对应组件", default="")
    parent_menu = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True, verbose_name="父级菜单", help_text=f"{MAIN_DISPLAY}__name")


class TyAdminModelConfig(models.Model):
    name = models.CharField(max_length=500, verbose_name="模型名称", default="")
    verbose_name = models.CharField(max_length=500, blank=True, null=True, verbose_name="模型备注")

    class Meta:
        verbose_name = '模型配置'


class TyAdminModelField(models.Model):
    model_name = models.ForeignKey(TyAdminModelConfig, on_delete=models.CASCADE, verbose_name="所属模型", help_text=f'{MAIN_DISPLAY}__name', null=True,
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
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default="female", verbose_name="性别")
    birthday = models.DateField(null=True, blank=True, verbose_name="出生年月")
    image = models.ImageField(upload_to="image/%Y/%m", max_length=100, verbose_name="头像", help_text=MAIN_AVATAR)

    class Meta:
        verbose_name = "用户信息"
        verbose_name_plural = verbose_name
