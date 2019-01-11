from django.db import models

class Lunbo(models.Model):
    bg = models.CharField(max_length=100)
    img = models.CharField(max_length=256)
    aURL = models.CharField(max_length=256)
    title = models.CharField(max_length=100)

class User(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=120)
    token = models.CharField(max_length=256)


