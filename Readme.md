# Zomato-Clone REST API
- Creating a Zomato clone REST API involves designing endpoints and functionalities similar to the original Zomato platform, which facilitates food ordering and restaurant discovery.


## Location Operations:

1. GET /api/List of city - 
- Retrieves a list of city based on various filters such as location, state, district, etc.
- http://localhost:5000/location


## Restaurant Operations:

1. GET /api/Restaurants with respect to city : 
-  Retrieves a list of city based on various filters such as location, cuisine, rating, etc.

-  http://localhost:5000/restaurants?stateId=4
-  http://localhost:5000/restaurants?stateId=1&mealId=2
-  http://localhost:5000/restaurants?mealId=3
-  http://localhost:5000/restaurants

## Menu Operations:

1. GET /api/restaurants/{restaurantId}/menu: Retrieves the menu of a specific restaurant.

## Order Operations:

1. POST /api/orders: Allows users to place an order by selecting items from the menu.
2. GET /api/orders: Retrieves a list of orders placed.
3. GET /api/orders/{orderId}: Retrieves details of a specific order.
4. PUT /api/orders/{orderId}: Allows users to update details of an existing order (e.g., canceling, modifying items).
5. DELETE /api/orders/{orderId}: Allows users to cancel an order.

## Reviews and Ratings:

1. POST /api/reviews: Allows users to submit reviews and ratings for a restaurant they've visited.
2. GET /api/restaurants/{restaurantId}/reviews: Retrieves reviews and ratings for a specific restaurant.

## Search and Filters:

1. GET /api/search: Allows users to search for restaurants based on various parameters like name, cuisine, location, etc.
2. GET /api/filters/cuisine: Retrieves a list of available cuisines for filtering restaurants.
3. GET /api/filters/location: Retrieves a list of available locations for filtering restaurants.

## User Profile:

1. GET /api/profile: Retrieves the profile information of the user.
2. PUT /api/profile: Allows users to update their profile information.


## Payment Integration:
1. Integrate payment gateways to handle transactions securely for order payments.