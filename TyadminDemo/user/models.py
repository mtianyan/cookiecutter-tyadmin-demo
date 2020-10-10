from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
from tyadmin_api_cli.contants import MAIN_AVATAR


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