# Initialize Apple OAuth
apple = OAuth().remote_app(
    'apple',
    consumer_key='',
    consumer_secret='',
    request_token_params={},
    base_url='https://appleid.apple.com/auth/authorize',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://appleid.apple.com/auth/token',
    authorize_url='https://appleid.apple.com/auth/authorize',
)