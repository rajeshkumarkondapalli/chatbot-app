class ChatMessage:
    def __init__(self, user_query, chatbot_response):
        self.user_query = user_query
        self.chatbot_response = chatbot_response

    def to_dict(self):
        return {
            'user_query': self.user_query,
            'chatbot_response': self.chatbot_response
        }
