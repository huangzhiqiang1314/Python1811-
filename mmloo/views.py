import hashlib
import random
import time

from django.shortcuts import render, redirect

from mmloo.models import User, Lunbo

# 首页
def index(request):
    # token
    lunbotus = Lunbo.objects.all()
    token = request.session.get('token')
    users = User.objects.filter(token=token)
    if users.count():
        user = users.first()
        name = user.name
    else:
        name = None

    return render(request, 'index.html', context={
        'name':name,'lunbotus':lunbotus
    })

# token加密
def generate_token():
    token = str(time.time()) + str(random.random())
    md5 = hashlib.md5()
    md5.update(token.encode('utf-8'))

    return  md5.hexdigest()

# 密码加密
def generate_password(password):
    md5 = hashlib.md5()
    md5.update(password.encode('utf-8'))
    return md5.hexdigest()

#注册
def register(request):
    if request.method == 'GET':
        return render(request,'register.html')
    elif request.method == 'POST':

        user = User()
        user.name = request.POST.get('name')
        user.password = generate_password(request.POST.get('password'))

        # 生成token
        user.token = generate_token()
        user.save()

        response = redirect('mmloo:index')
        request.session['token']=user.token

        return response

# 退出
def logout(request):
    rensponse = redirect('mmloo:index')
    request.session.flush()
    return rensponse

# 登录
def login(request):
    if request.method == 'GET':
        return render(request,'login.html')
    elif request.method == 'POST':

        name = request.POST.get('name')
        password = generate_password(request.POST.get('password'))
        print(password,name)
        users = User.objects.filter(name=name).filter(password=password)
        if users.count():  #成功
            # 重定向到首页
            response = redirect('mmloo:index')

            user = users.first()
            user.token = generate_token()
            user.save()
            request.session['token'] = user.token
            # request.session.set_expiry(30)
            return response
        else:     #失败
            return render(request,'login.html',context={
                'err':'用户名或者密码错误'
            })


