from datetime import datetime
from django.shortcuts import redirect, render
from django.urls import reverse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, APIException
from rest_framework import viewsets, status
from .models import Movie
from .serializers import MovieSerializer
import requests

# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def search_movie_detail(self, imdb_id):
        api_key = 'fad4dae9'
        try:
            response = requests.get(f"http://www.omdbapi.com/?apikey={api_key}&i={imdb_id}&plot=full")
        except requests.exceptions.RequestException as err:
            raise APIException({"success": False, "code": "CONNECT_OMDB_ERROR", "message": "Fail to call omdbapis"})
        response_json = response.json()
        is_search_success = response_json.get('Response') == 'True'
        if not is_search_success:
            failed_reason = response_json.get('Error')
            raise APIException({"success": False, "code": "FAIL_ON_SEARCH_ERROR", "message": f"Fail to search movie detail"})
        return response_json

    def validate_save_or_destroy_movie_params(self, imdb_id):
        if not imdb_id:
            raise ValidationError({"success": False, "code": "EMPTY_IMDBID_ERROR", "message": "No imdbID provided."})

    def check_movie_limit(self):
        max_num_of_movies = 5
        num_of_movies = Movie.objects.count()

        if num_of_movies >= max_num_of_movies: 
            response = {"success": False, "code": "REACHED_MOVIES_LIMIT", "message": "Reached the limit of 5 movies"}
            raise APIException(response)
        
    def check_duplicated_movie(self, imdb_id):
        if Movie.objects.filter(imdbID=imdb_id).exists():
            raise ValidationError({"success": False, "code": "REACHED_MOVIES_LIMIT", "message": "This movie is already added"})

    # override default create action
    def create(self, request, *args, **kwargs):
        imdb_id = request.query_params.get('imdbID')
        self.validate_save_or_destroy_movie_params(imdb_id)
        self.check_movie_limit()
        self.check_duplicated_movie(imdb_id)
        movie_detail_json = self.search_movie_detail(imdb_id)
        try:
            movie = Movie.objects.create(**movie_detail_json)
            serializer = MovieSerializer(movie)
        except Exception as err:
            raise APIException({"success": False, "code": "FAIL_TO_CREATE_MOVIE_RECORD_ERROR", "message": f"Fail to create movie record"})

        return Response({
            "success": True,
            "movie": serializer.data,
            "timestamp": datetime.now().isoformat()
        })
    
    # custom action - delete by imdbID
    @action(detail=False, methods=['delete'])
    def deleteByImdbid(self, request, *args, **kwargs):
        imdb_id = request.query_params.get('imdbID')
        self.validate_save_or_destroy_movie_params(imdb_id)
        print('trying to destroy')
        try:
            movie = Movie.objects.get(imdbID=imdb_id)
            movie.delete()
            return Response({
                "success": True,
                "timestamp": datetime.now().isoformat()
            }, status=status.HTTP_204_NO_CONTENT)
        except Movie.DoesNotExist:
            pass
        return Response({
            "success": False,
            "code": "FAIL_TO_REMOVE_MOVIE_ERROR",
            "message": "Failed to remove movie"
        },status=status.HTTP_400_BAD_REQUEST)


    def validate_search_params(self, title, page):
        if not title:
            raise ValidationError({"success": False, "code": "EMPTY_TITLE_ERROR", "message": "No title provided."})
        if not page.isdigit():
            raise ValidationError({"success": False, "code": "PAGE_NOT_DIGIT_ERROR", "message": "Page is not a digit"})

    # custom action - search
    @action(detail=False, methods=['get'])
    def search(self, request):
        default_page_num = '1'
        title = request.query_params.get('title')
        page = request.query_params.get('page') or default_page_num
        self.validate_search_params(title, page)
        api_key = 'fad4dae9'
        try:
            response = requests.get(f"http://www.omdbapi.com/?apikey={api_key}&type=movie&s={title}&page={page}")
        except requests.exceptions.RequestException as err:
            raise APIException({"success": False, "code": "CONNECT_OMDB_ERROR", "message": "Fail to call omdbapis"})
        response_json = response.json()
        is_search_success = response_json.get('Response') == 'True'

        print(response_json);
        if not is_search_success:
            failed_reason = response_json.get('Error')
            # print(failed_reason)
            if(failed_reason == 'Movie not found!'):
                return Response({
                    "success": True,
                    "movies": [],
                    "totalPage": 0,
                    "currentPage": int(page),
                    "timestamp": datetime.now().isoformat()
                })
            else:
                raise APIException({"success": False, "code": "FAIL_ON_SEARCH_ERROR", "message": f"Fail to search"})
        search_movies = response_json.get('Search')
        num_of_movies = response_json.get('totalResults')
        max_num_per_page = 10
        total_page = round(int(num_of_movies) / max_num_per_page)
        return Response({
            "success": True,
            "movies": search_movies,
            "totalPage": total_page,
            "currentPage": int(page),
            "timestamp": datetime.now().isoformat()
        })
    
    def validate_search_detail_params(self, imdb_id):
        if not imdb_id:
            raise ValidationError({"success": False, "code": "EMPTY_IMDBID_ERROR", "message": "No imdbID provided."})
    
    # custom action - search detail
    @action(detail=False, methods=['get'])
    def searchDetail(self, request):
        imdb_id = request.query_params.get('imdbID')
        self.validate_search_detail_params(imdb_id)
        response_json = self.search_movie_detail(imdb_id)
        return Response({
            "success": True,
            "movieDetail": response_json,
            "timestamp": datetime.now().isoformat()
        })