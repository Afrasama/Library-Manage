from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/library"
mongo = PyMongo(app)
db = mongo.db.books

@app.route('/books', methods=['GET'])
def get_books():
    books = list(db.find())
    for book in books:
        book["_id"] = str(book["_id"])
    return jsonify(books), 200

@app.route('/books', methods=['POST'])
def add_book():
    book = request.get_json()
    db.insert_one(book)
    return jsonify({"message": "Book added successfully"}), 201

@app.route('/books/<id>', methods=['DELETE'])
def delete_book(id):
    try:
        result = db.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return jsonify({"message": "Book deleted successfully"}), 200
        else:
            return jsonify({"message": "Book not found"}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
