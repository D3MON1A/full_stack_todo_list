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
    print(f"This is method{request.method}")
    if request.method == 'POST':
        body = request.json
        print(f"This is the body{body}")
        todo = Todo(body['todo'])
        print(f"This is a todo{todo}")
        db.session.add(todo)
        db.session.commit()
        return jsonify(todo.serialize()), 200
    # GET request
    if request.method == 'GET':
        all_todos = Todo.query.all()
        all_todos = list(map(lambda x: x.serialize(), all_todos))
        return jsonify(all_todos), 200
    return "Invalid Method", 404
    #DELETE request
@api.route('/todos/<int:position>', methods=['DELETE'])
def delete_todos(position):
    singleTodo=Todo.query.get(position)
    db.session.delete(singleTodo)
    db.session.commit()
    return "item deleted", 200




