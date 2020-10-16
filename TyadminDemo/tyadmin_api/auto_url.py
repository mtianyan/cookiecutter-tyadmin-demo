from tyadmin_api import auto_views
from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter
    
router = DefaultRouter(trailing_slash=False)
    
router.register('ty_admin_menu_config/?', auto_views.TyAdminMenuConfigViewSet)
    
router.register('ty_admin_model_config/?', auto_views.TyAdminModelConfigViewSet)
    
router.register('ty_admin_model_field/?', auto_views.TyAdminModelFieldViewSet)
    
router.register('bgq_info/?', auto_views.BgqInfoViewSet)
    
router.register('auto_discovery/?', auto_views.AutoDiscoveryViewSet)
    
router.register('historical_network_device/?', auto_views.HistoricalNetworkDeviceViewSet)
    
router.register('network_device/?', auto_views.NetworkDeviceViewSet)
    
router.register('user_info/?', auto_views.UserInfoViewSet)
    
urlpatterns = [
        re_path('^', include(router.urls)),
    ]
    