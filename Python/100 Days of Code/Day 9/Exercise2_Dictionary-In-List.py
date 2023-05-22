# Dictionary In List

## Instructions
'''
You are going to write a program that adds to a travel_log. You can 
see a travel_log which is a List that contains 2 Dictionaries.

Write a function that will work with the following line of code to add the entry
for Russia to the travel_log:
    add_new_country("Russia", 2, ["Moscow", "Saint Petersburg"])

i.e. You've visited Russia 2 times.
     You've been to Moscow and Saint Petersburg.

DO NOT modify the travel_log directly. You need to create a function that modifies it.
'''
# Do not change the code below
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
# Do not change the code above

# TODO:
# Write the function that will allow new countries to be added to the travel log
def add_new_country(country, visits, cities):
    new_country = {}
    new_country["country"] = country
    new_country["cities_visited"] = cities
    new_country["total_visits"] = visits
    travel_log.append(new_country)

# Do not change the code below
add_new_country("Russia", 2, ["Moscow", "Saint Petersburg"])
print(travel_log)





