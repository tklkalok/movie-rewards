from django.db import models

# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=200)
    year = models.CharField(max_length=4)
    rated = models.CharField(max_length=10, blank=True)
    released = models.CharField(max_length=20, blank=True)
    runtime = models.CharField(max_length=10, blank=True)
    genre = models.CharField(max_length=100, blank=True)
    director = models.CharField(max_length=100, blank=True)
    writer = models.CharField(max_length=200, blank=True)
    actors = models.CharField(max_length=500, blank=True)
    plot = models.TextField(blank=True)
    language = models.CharField(max_length=50, blank=True)
    country = models.CharField(max_length=50, blank=True)
    awards = models.TextField(blank=True)
    poster = models.URLField(blank=True)
    ratings = models.TextField(blank=True)
    metascore = models.CharField(max_length=10, blank=True)
    imdbRating = models.CharField(max_length=4, blank=True)
    imdbVotes = models.CharField(max_length=10, blank=True)
    imdbID = models.CharField(max_length=20, blank=True)
    type = models.CharField(max_length=20, blank=True)
    dvd = models.CharField(max_length=20, blank=True)
    boxOffice = models.CharField(max_length=20, blank=True)
    production = models.CharField(max_length=50, blank=True)
    website = models.URLField(blank=True)
    response = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return self.title