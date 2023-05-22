# Nesting lists and dictionaries

'''
Syntax:
    {
        key: [List],
        key2: {Dictionary}
    }

    nesting dictionaries in a list
    [{
        key: [List],
        key2: {Dictionary}
    },
    {
        key: [List],
        key2: {Dictionary}
    }]
'''
capitals = {
    "France": "Paris",
    "Germany": "Berlin",
}


# nesting a list in a dictionary
travel_log = {
    "France": ["Paris", "Lille", "Dijon"],
    "Germany": ["Berlin", "Hamburg", "Stuttgart"], 
}

# nesting a dictionary in a dictionary
travel_log = {
    "France": {"cities_visited": ["Paris", "Lille", "Dijon"]},      #["Paris", "Little", "Dijon"],
    "Germany": ["Berlin", "Hamburg", "Stuttgart"], 
}

travel_log = {
    "France": {"cities_visited": ["Paris", "Lille", "Dijon"], "total_visits": 12},      #["Paris", "Little", "Dijon"],
    "Germany": {"cities_visited": ["Berlin", "Hamburg", "Stuttgart"], "total_visits": 5}, 
}

# nesting a dictionary in a list
travel_log = [
    {
        "country": "France", 
        "cities_visited": ["Paris", "Lille", "Dijon"], 
        "total_visits": 12
    },
    {
        "country": "Germany", 
        "cities_visited": ["Berlin", "Hamburg", "Stuttgart"], 
        "total_visits": 5
    }, 
]
