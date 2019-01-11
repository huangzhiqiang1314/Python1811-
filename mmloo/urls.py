from django.conf.urls import url

from mmloo import views

urlpatterns = [
    url(r'^index/$',views.index,name='index'),

    url(r'^register/$',views.register,name='register'),

    url(r'^logout/$',views.logout,name='logout'),

    url(r'^login/$', views.login, name='login'),

]