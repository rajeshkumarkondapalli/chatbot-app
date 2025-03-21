from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from models import ChatMessage

app = Flask(__name__)
CORS(app)

# MongoDB Configuration
mongo_uri = 'mongodb://mongodb:27017/'
mongo_db_name = 'chatbot_db'

try:
    client = MongoClient(mongo_uri)
    db = client[mongo_db_name]
    messages_collection = db['messages']
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
    raise

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_query = data.get('message')

        # Simulate Chatbot Response
        chatbot_response = generate_chatbot_response(user_query)

        # Save to MongoDB
        chat_message = ChatMessage(user_query=user_query, chatbot_response=chatbot_response)
        messages_collection.insert_one(chat_message.to_dict())

        return jsonify({'response': chatbot_response})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

def generate_chatbot_response(user_query):
    """
    Replace this with your actual chatbot integration
    """
    if "hello" in user_query.lower():
        return "Hello there! How can I help you?"
    elif "goodbye" in user_query.lower():
        return "Goodbye! Have a great day."
    else:
        return f"I received your message: {user_query}. I'm a simple bot, but I'll try my best."

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
