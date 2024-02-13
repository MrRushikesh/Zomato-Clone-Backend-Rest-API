# Zomato-Clone REST API
- Creating a Zomato clone REST API involves designing endpoints and functionalities similar to the original Zomato platform, which facilitates food ordering and restaurant discovery.

## Location Operations:

1. GET /api/List of city - 
-  Retrieves a list of city based on various filters such as location, state, district, etc.

-  Localhost URL -:  http://localhost:5000/location
-  Live URL -:  https://zomato-rest-api.onrender.com/location


## Meal Type Operations : 

1. GET /api/List of quick Search -
-  Retrieves a list of mealType based on various filters such as mealType.

-  Localhost URL -:  http://localhost:5000/mealType
-  Live URL -: https://zomato-rest-api.onrender.com/mealType

## Restaurant Operations:

1. GET /api/Restaurants with respect to city : 
-  Retrieves a list of restaurants based on filters such as location.

-  Localhost URL -: http://localhost:5000/restaurants?stateId=4
-  Live URL -: https://zomato-rest-api.onrender.com/restaurants?stateId=4

2. GET /api/Restaurants with respect to city & mealtype
-  Retrieves a list of restaurant based on various filters such as location & mealtypes.

-  Localhost URL -: http://localhost:5000/restaurants?stateId=1&mealId=2
-  Live URL -: https://zomato-rest-api.onrender.com/restaurants?stateId=1&mealId=2

3. GET /api/Restaurants with respect to mealtype
-  Retrieves a list of restaurant based on filters such as mealtypes.

-  Localhost URL -:  http://localhost:5000/restaurants?mealId=3
-  Live URL -: https://zomato-rest-api.onrender.com/restaurants?mealId=3

4. GET /api/Display all restaurants 
-  Retrieves a list of all available restaurants.

-  Localhost URL -:  http://localhost:5000/restaurants
-  Live URL -: https://zomato-rest-api.onrender.com/restaurants

## Menu Filter Operations:

1. GET /api/Restaurant with respect to mealtype + cuisine
-  Retrieves a list of available cuisines for filtering restaurants.

-  Localhost URL -: http://localhost:5000/filter/2?cuisineId=4
-  Live URL -: https://zomato-rest-api.onrender.com/filter/2?cuisineId=4

2. GET /api/Restaurant with respect to mealtype + cost
-  Retrieves a list of available cuisines for filtering restaurants.

-  Localhost URL -:  http://localhost:5000/filter/1?lcost=500&hcost=1000
-  Live URL -: https://zomato-rest-api.onrender.com/1?lcost=500&hcost=1000

3. GET /api/Restaurant without any filter. 
-  Retrieves a list of available cuisines for filtering restaurants.

-  Localhost URL -:  http://localhost:5000/filter/1
-  Live URL -: https://zomato-rest-api.onrender.com/filter/1

## Restaurant Details Operations:
1. GET /api/Details of the restaurants. 
-  Retrieves reviews and ratings for a specific restaurant.

-  Localhost URL -: http://localhost:5000/details/11
-  Live URL -: https://zomato-rest-api.onrender.com/details/11

2. GET /api/Menu of the restaurants. 
-  Retrieves availble menu for a specific restaurant.

-  Localhost URL -: http://localhost:5000/menu/5
-  Live URL -:  https://zomato-rest-api.onrender.com/menu/5


## Menu Selected Operation -: 

1. POST /api/display menu details selected by user. 
-  Retrieves user selected menu information .

-  Localhost URL -: http://localhost:5000/menuDetails
-  Live URL -: https://zomato-rest-api.onrender.com/menuDetails

    BODY -> raw -> JSON -> 

    ```json
        {
            "id":[4,8,21,9]
        }
    ```


## Orders Operation -: 
1. POST /api/placeOrder 
-  Allows users to place an order by selecting items from the menu.

-  Localhost URL -: http://localhost:5000/placeOrder
-  Live URL -: https://zomato-rest-api.onrender.com/placeOrder
    
   BODY -> raw -> JSON -> 

    ```json
        { 
            "name" : "rushi", 
            "email" : "rushi@gmail.com", 
            "address" : "home 65", 
            "phone" : 7447640893, 
            "cost" : 612, 
            "menuItem" : [ 45, 34, 41 ], 
            "status" : "Delivered" 
        }
    ```

2. GET /api/orders:

-  Retrieves a list of orders placed. 

-  Localhost URL -: http://localhost:5000/orders?email=rushi@gmail.com
-  Live URL -:  https://zomato-rest-api.onrender.com/orders?email=rushi@gmail.com

3. PUT /api/updateOrder/

-  Allows users to update details of an existing order (e.g., canceling, modifying items).
-  Localhost URL -: http://localhost:5000/updateOrder
-  Live URL -: https://zomato-rest-api.onrender.com/updateOrder

   BODY -> raw -> JSON -> 

    ```json
        {     
            "_id":"65c9fff803a710300c651772", 
            "status":"Out for delivery"
        }
    ```
    

4. DELETE /api/deleteOrders/:

-  Allows users to cancel an order.

-  Localhost URL -: http://localhost:5000/deleteOrder
-  Live URL -: https://zomato-rest-api.onrender.com/deleteOrder

   BODY -> raw -> JSON ->

    ```json
        {
        "_id" : "65c9fff803a710300c651772"
        } 
    ```
