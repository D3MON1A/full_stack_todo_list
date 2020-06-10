from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    todo = db.Column(db.String(80), unique=True, nullable=False)
    
    def __repr__(self):
        return '<Todo %r>' % self.todo

    def serialize(self):
        return {
            "todo": self.todo
            
        }