from tyadmin_api_cli.utils import init_django_env

init_django_env('TyadminDemo.settings')
from user.models import TyAdminMenuConfig

with open('menu.json') as fr:
    content = fr.read()
import demjson

content = demjson.decode(content)


def append_child(current_list, total_list, parent_node=None):
    for one in current_list:
        if parent_node:
            one["parent"] = parent_node['path']
        if "path" in one.keys() and "name" in one.keys():
            total_list.append(one)
        if "routes" in one.keys():
            append_child(one["routes"], total_list, parent_node=one)


if __name__ == '__main__':
    total_list = []
    append_child(content, total_list)
    for one in total_list:
        if "routes" in one.keys():
            del one["routes"]
        if "parent" in one.keys():
            parent_menu = TyAdminMenuConfig.objects.get(path=one["parent"])
            one["parent_menu"] = parent_menu
            del one["parent"]
        TyAdminMenuConfig(**one).save()

