import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:sunil@localhost:5432/ecommerce_db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY','sunilmasani')

  



class DevelopmentConfig(Config):
    DEBUG=True

class ProductionConfig(Config):
    DEBUG=True