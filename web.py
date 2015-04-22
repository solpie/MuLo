from bottle import get, run, static_file, post, route, request, redirect, response

import sys
import json


@get('/')
def index():
    return static_file('index.html', root='static')


@get('/<path:re:.+\.(js|css|jsx|svg)>')
def static(path):
    return static_file(path, root='static/')


@get('/page')
def page():
    idx = request.query.idx
    if not idx:
        idx = 1
    count = 20
    response.status = 200
    response.content_type = 'application/json'
    return json.dumps(mulo.getPage(idx, count))


from mulo import MuLo

mulo = MuLo()
if len(sys.argv) > 1:
    run(host='0.0.0.0', port=sys.argv[1], debug=True)
else:
    run(host='127.0.0.1', reloader=True, debug=True, port=8084)