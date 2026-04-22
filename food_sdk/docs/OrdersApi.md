# openapi_client.OrdersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**cancel_order_orders_order_id_delete**](OrdersApi.md#cancel_order_orders_order_id_delete) | **DELETE** /orders/{order_id} | Cancel Order
[**list_my_orders_orders_get**](OrdersApi.md#list_my_orders_orders_get) | **GET** /orders/ | List My Orders
[**place_order_orders_post**](OrdersApi.md#place_order_orders_post) | **POST** /orders/ | Place Order


# **cancel_order_orders_order_id_delete**
> cancel_order_orders_order_id_delete(order_id)

Cancel Order

Cancel an existing order (only the owner can cancel).

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
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
    api_instance = openapi_client.OrdersApi(api_client)
    order_id = 56 # int | 

    try:
        # Cancel Order
        api_instance.cancel_order_orders_order_id_delete(order_id)
    except Exception as e:
        print("Exception when calling OrdersApi->cancel_order_orders_order_id_delete: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **order_id** | **int**|  | 

### Return type

void (empty response body)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_my_orders_orders_get**
> List[OrderOut] list_my_orders_orders_get()

List My Orders

Retrieve all orders placed by the authenticated user.

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.order_out import OrderOut
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
    api_instance = openapi_client.OrdersApi(api_client)

    try:
        # List My Orders
        api_response = api_instance.list_my_orders_orders_get()
        print("The response of OrdersApi->list_my_orders_orders_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->list_my_orders_orders_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**List[OrderOut]**](OrderOut.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **place_order_orders_post**
> OrderOut place_order_orders_post(order_create)

Place Order

Place a new order.

Trick Logic:
1. Reject if target restaurant is closed (is_open = False).
2. Reject if user already has an active order at that restaurant (duplicate prevention).

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.order_create import OrderCreate
from openapi_client.models.order_out import OrderOut
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
    api_instance = openapi_client.OrdersApi(api_client)
    order_create = openapi_client.OrderCreate() # OrderCreate | 

    try:
        # Place Order
        api_response = api_instance.place_order_orders_post(order_create)
        print("The response of OrdersApi->place_order_orders_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->place_order_orders_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **order_create** | [**OrderCreate**](OrderCreate.md)|  | 

### Return type

[**OrderOut**](OrderOut.md)

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

