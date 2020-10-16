
from rest_framework import serializers
from user.models import TyAdminMenuConfig, TyAdminModelConfig, TyAdminModelField, BgqInfo, AutoDiscovery, HistoricalNetworkDevice, NetworkDevice, UserInfo

    

class TyAdminMenuConfigSerializer(serializers.ModelSerializer):
    parent_menu_text = serializers.CharField(source="parent_menu.name", read_only=True)

    class Meta:
        model = TyAdminMenuConfig
        fields = "__all__"
        

class TyAdminModelConfigSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TyAdminModelConfig
        fields = "__all__"
        

class TyAdminModelFieldSerializer(serializers.ModelSerializer):
    model_name_text = serializers.CharField(source="model_name.name", read_only=True)

    class Meta:
        model = TyAdminModelField
        fields = "__all__"
        

class BgqInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BgqInfo
        fields = "__all__"
        

class AutoDiscoverySerializer(serializers.ModelSerializer):
    bgq_text = serializers.CharField(source="bgq.name", read_only=True)

    class Meta:
        model = AutoDiscovery
        fields = "__all__"
        

class HistoricalNetworkDeviceSerializer(serializers.ModelSerializer):
    bgq_text = serializers.CharField(source="bgq.name", read_only=True)
    changed_by_text = serializers.CharField(source="changed_by.username", read_only=True)
    history_user_text = serializers.CharField(source="history_user.", read_only=True)

    class Meta:
        model = HistoricalNetworkDevice
        fields = "__all__"
        

class NetworkDeviceSerializer(serializers.ModelSerializer):
    bgq_text = serializers.CharField(source="bgq.name", read_only=True)
    changed_by_text = serializers.CharField(source="changed_by.username", read_only=True)

    class Meta:
        model = NetworkDevice
        fields = "__all__"
        

class UserInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserInfo
        fields = "__all__"
        