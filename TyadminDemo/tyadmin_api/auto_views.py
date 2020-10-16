
from rest_framework import viewsets
from tyadmin_api.custom import XadminViewSet
from user.models import TyAdminMenuConfig, TyAdminModelConfig, TyAdminModelField, BgqInfo, AutoDiscovery, HistoricalNetworkDevice, NetworkDevice, UserInfo

from tyadmin_api.auto_serializers import TyAdminMenuConfigSerializer, TyAdminModelConfigSerializer, TyAdminModelFieldSerializer, BgqInfoSerializer, AutoDiscoverySerializer, HistoricalNetworkDeviceSerializer, NetworkDeviceSerializer, UserInfoSerializer
from tyadmin_api.auto_filters import TyAdminMenuConfigFilter, TyAdminModelConfigFilter, TyAdminModelFieldFilter, BgqInfoFilter, AutoDiscoveryFilter, HistoricalNetworkDeviceFilter, NetworkDeviceFilter, UserInfoFilter
    
    
class TyAdminMenuConfigViewSet(XadminViewSet):
        serializer_class = TyAdminMenuConfigSerializer
        queryset = TyAdminMenuConfig.objects.all()
        filter_class = TyAdminMenuConfigFilter
        search_fields = ["name","path","icon","component"]
        
    
class TyAdminModelConfigViewSet(XadminViewSet):
        serializer_class = TyAdminModelConfigSerializer
        queryset = TyAdminModelConfig.objects.all()
        filter_class = TyAdminModelConfigFilter
        search_fields = ["name","verbose_name"]
        
    
class TyAdminModelFieldViewSet(XadminViewSet):
        serializer_class = TyAdminModelFieldSerializer
        queryset = TyAdminModelField.objects.all()
        filter_class = TyAdminModelFieldFilter
        search_fields = ["name","desc","type"]
        
    
class BgqInfoViewSet(XadminViewSet):
        serializer_class = BgqInfoSerializer
        queryset = BgqInfo.objects.all()
        filter_class = BgqInfoFilter
        search_fields = ["name","address","contacts","mobel"]
        
    
class AutoDiscoveryViewSet(XadminViewSet):
        serializer_class = AutoDiscoverySerializer
        queryset = AutoDiscovery.objects.all()
        filter_class = AutoDiscoveryFilter
        search_fields = ["management_network"]
        
    
class HistoricalNetworkDeviceViewSet(XadminViewSet):
        serializer_class = HistoricalNetworkDeviceSerializer
        queryset = HistoricalNetworkDevice.objects.all()
        filter_class = HistoricalNetworkDeviceFilter
        search_fields = ["status","name","devicerole","describe","model","software","sn","history_change_reason","history_type"]
        
    
class NetworkDeviceViewSet(XadminViewSet):
        serializer_class = NetworkDeviceSerializer
        queryset = NetworkDevice.objects.all()
        filter_class = NetworkDeviceFilter
        search_fields = ["status","name","devicerole","describe","model","software","sn"]
        
    
class UserInfoViewSet(XadminViewSet):
        serializer_class = UserInfoSerializer
        queryset = UserInfo.objects.all()
        filter_class = UserInfoFilter
        search_fields = ["password","username","first_name","last_name","email","gender"]
        