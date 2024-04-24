from marshmallow import fields, Schema

class UserSchem(Schema):
    id = fields.String()
    username = fields.String()
    email = fields.String()