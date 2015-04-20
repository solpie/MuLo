from bottle import get, run, static_file, post, route, request, redirect


@get('/')
def index():
    return 'hello mulo'