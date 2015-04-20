from bottle import get, run, static_file, post, route, request, redirect

import sys
@get('/')
def index():
    return 'hello mulo'


if len(sys.argv) > 1:
    run(host='0.0.0.0', port=sys.argv[1], debug=True)
else:
    run(host='127.0.0.1', reloader=True, debug=True)