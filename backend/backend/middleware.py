from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.conf import settings
from urllib.parse import parse_qs
from jwt import decode, InvalidTokenError
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth import get_user_model

class JwtAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = scope.get('query_string', b'').decode()
        query_params = parse_qs(query_string)
        
        token = query_params.get('token', [None])[0]
        
        if not token:
            headers = dict(scope['headers'])
            if b'authorization' in headers:
                try:
                    token = headers[b'authorization'].decode().split()[1]
                except IndexError:
                    token = None
        
        scope['user'] = await self.get_user_from_token(token)
        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def get_user_from_token(self, token):
        User = get_user_model()
        try:
            if not token:
                return AnonymousUser()

            UntypedToken(token)

            decoded_data = decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            
            user = User.objects.get(id=decoded_data["user_id"])
            
            return user
        except (InvalidToken, TokenError, InvalidTokenError, User.DoesNotExist):
            return AnonymousUser()