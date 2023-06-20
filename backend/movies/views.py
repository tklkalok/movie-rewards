from datetime import datetime
from django.shortcuts import redirect, render
from django.urls import reverse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, APIException
from rest_framework import viewsets
from .models import Movie
from .serializers import MovieSerializer
import requests

# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    # override default create action
    def create(self, request, *args, **kwargs):
        max_num_of_movies = 5
        num_of_movies = Movie.objects.count()
        if num_of_movies >= max_num_of_movies: 
            response = {"success": False, "code": "REACHED_MOVIES_LIMIT", "message": "Reached the limit of 5 movies"}
            return Response(response, status=400)
        return super().create(request, *args, **kwargs)

    def validate_search_params(self, title, page):
        if not title:
            raise ValidationError({"success": False, "code": "EMPTY_TITLE_ERROR", "message": "No title provided."})
        if not page.isdigit():
            raise ValidationError({"success": False, "code": "PAGE_NOT_DIGIT_ERROR", "message": "Page is not a digit"})

    # custom action
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
        if not is_search_success:
            failed_reason = response_json.get('Error')
            raise APIException({"success": False, "code": "FAIL_ON_SEARCH_ERROR", "message": f"Fail to search with reason: [{str(failed_reason)}]"})
        search_movies = response_json.get('Search')
        num_of_movies = response_json.get('totalResults')
        max_num_per_page = 10
        total_page = round(int(num_of_movies) / max_num_per_page)
        return Response({
            "success": True,
            "movies": search_movies,
            "totalPage": total_page,
            "currentPage": page,
            "timestamp": datetime.now().isoformat()
        })