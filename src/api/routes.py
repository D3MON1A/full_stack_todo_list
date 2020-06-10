"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db,Todo
from api.utils import generate_sitemap
#from models import Person

api = Blueprint('api', __name__)


@api.route('/todos', methods=['POST', 'GET'])
def handle_todos():

    if request.method == 'POST':
        body = request.get_json()
        
        todo = Todo(todo=body['todo'])
        db.session.add(todo)
        db.session.commit()
        return "ok", 200
    # GET request
    if request.method == 'GET':
        all_people = Todo.query.all()
        all_people = list(map(lambda x: x.serialize(), all_people))
        return jsonify(all_people), 200
    return "Invalid Method", 404
