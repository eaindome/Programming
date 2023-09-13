from typing import Any
from datetime import datetime, timedelta, timezone

from jose import jwt


def create_token(data: dict[str, Any], expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()

    now = datetime.now(timezone.utc)

    expires_at = now + expires_delta if expires_delta else now + timedelta(minutes=15)
    '''
    i.e.
    if expires_delta is None:
        expires_at = now + time_delta(minutes=15)
    else:
        expires_at = now + expires_delta
    '''

    to_encode.update({"iat": now, "exp": expires_at})
    return jwt.encode(to_encode, algorithm="HS256", key="something")