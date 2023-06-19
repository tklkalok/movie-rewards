from django.shortcuts import redirect, render
from django.urls import reverse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Movie
from .serializers import MovieSerializer

# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    # override default create action
    def create(self, request, *args, **kwargs):
        max_num_of_movies = 5
        num_of_movies = Movie.objects.count()
        
        if num_of_movies >= max_num_of_movies: 
            response = {'code': 'REACHED_MOVIES_LIMIT','message': 'Reached the limit of 5 movies'}
            return Response(response, status=400)

        return super().create(request, *args, **kwargs)