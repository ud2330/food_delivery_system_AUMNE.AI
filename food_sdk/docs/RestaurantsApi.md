# openapi_client.RestaurantsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_restaurant_restaurants_post**](RestaurantsApi.md#create_restaurant_restaurants_post) | **POST** /restaurants/ | Create Restaurant
[**get_restaurant_restaurants_restaurant_id_get**](RestaurantsApi.md#get_restaurant_restaurants_restaurant_id_get) | **GET** /restaurants/{restaurant_id} | Get Restaurant
[**list_restaurants_restaurants_get**](RestaurantsApi.md#list_restaurants_restaurants_get) | **GET** /restaurants/ | List Restaurants


# **create_restaurant_restaurants_post**
> RestaurantOut create_restaurant_restaurants_post(restaurant_create)

Create Restaurant

Create a new restaurant (requires authentication).

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.restaurant_create import RestaurantCreate
from openapi_client.models.restaurant_out import RestaurantOut
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

configuration.access_token = os.environ["ACCESS_TOKEN"]

# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.RestaurantsApi(api_client)
    restaurant_create = openapi_client.RestaurantCreate() # RestaurantCreate | 

    try:
        # Create Restaurant
        api_response = api_instance.create_restaurant_restaurants_post(restaurant_create)
        print("The response of RestaurantsApi->create_restaurant_restaurants_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RestaurantsApi->create_restaurant_restaurants_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **restaurant_create** | [**RestaurantCreate**](RestaurantCreate.md)|  | 

### Return type

[**RestaurantOut**](RestaurantOut.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_restaurant_restaurants_restaurant_id_get**
> RestaurantOut get_restaurant_restaurants_restaurant_id_get(restaurant_id)

Get Restaurant

Retrieve a single restaurant by ID.

### Example


```python
import openapi_client
from openapi_client.models.restaurant_out import RestaurantOut
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.RestaurantsApi(api_client)
    restaurant_id = 56 # int | 

    try:
        # Get Restaurant
        api_response = api_instance.get_restaurant_restaurants_restaurant_id_get(restaurant_id)
        print("The response of RestaurantsApi->get_restaurant_restaurants_restaurant_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RestaurantsApi->get_restaurant_restaurants_restaurant_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **restaurant_id** | **int**|  | 

### Return type

[**RestaurantOut**](RestaurantOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_restaurants_restaurants_get**
> List[RestaurantOut] list_restaurants_restaurants_get()

List Restaurants

Retrieve a list of all restaurants.

### Example


```python
import openapi_client
from openapi_client.models.restaurant_out import RestaurantOut
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.RestaurantsApi(api_client)

    try:
        # List Restaurants
        api_response = api_instance.list_restaurants_restaurants_get()
        print("The response of RestaurantsApi->list_restaurants_restaurants_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RestaurantsApi->list_restaurants_restaurants_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**List[RestaurantOut]**](RestaurantOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

