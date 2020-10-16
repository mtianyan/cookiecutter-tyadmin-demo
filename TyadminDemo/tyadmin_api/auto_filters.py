
from django_filters import rest_framework as filters
from tyadmin_api.custom import DateFromToRangeFilter
from user.models import TyAdminMenuConfig, TyAdminModelConfig, TyAdminModelField, BgqInfo, AutoDiscovery, HistoricalNetworkDevice, NetworkDevice, UserInfo

        

class TyAdminMenuConfigFilter(filters.FilterSet):
    parent_menu_text = filters.CharFilter(field_name="parent_menu")

    class Meta:
        model = TyAdminMenuConfig
        exclude = []
    

class TyAdminModelConfigFilter(filters.FilterSet):

    class Meta:
        model = TyAdminModelConfig
        exclude = []
    

class TyAdminModelFieldFilter(filters.FilterSet):
    model_name_text = filters.CharFilter(field_name="model_name")

    class Meta:
        model = TyAdminModelField
        exclude = []
    

class BgqInfoFilter(filters.FilterSet):

    class Meta:
        model = BgqInfo
        exclude = []
    

class AutoDiscoveryFilter(filters.FilterSet):
    bgq_text = filters.CharFilter(field_name="bgq")

    class Meta:
        model = AutoDiscovery
        exclude = []
    

class HistoricalNetworkDeviceFilter(filters.FilterSet):
    bgq_text = filters.CharFilter(field_name="bgq")
    changed_by_text = filters.CharFilter(field_name="changed_by")
    history_user_text = filters.CharFilter(field_name="history_user")
    history_date = DateFromToRangeFilter(field_name="history_date")

    class Meta:
        model = HistoricalNetworkDevice
        exclude = []
    

class NetworkDeviceFilter(filters.FilterSet):
    bgq_text = filters.CharFilter(field_name="bgq")
    changed_by_text = filters.CharFilter(field_name="changed_by")
    add_time = DateFromToRangeFilter(field_name="add_time")
    modify_time = DateFromToRangeFilter(field_name="modify_time")

    class Meta:
        model = NetworkDevice
        exclude = []
    

class UserInfoFilter(filters.FilterSet):
    last_login = DateFromToRangeFilter(field_name="last_login")
    date_joined = DateFromToRangeFilter(field_name="date_joined")

    class Meta:
        model = UserInfo
        exclude = ["image","image"]
    