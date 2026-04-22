# RestaurantCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**is_open** | **bool** |  | [optional] [default to True]

## Example

```python
from openapi_client.models.restaurant_create import RestaurantCreate

# TODO update the JSON string below
json = "{}"
# create an instance of RestaurantCreate from a JSON string
restaurant_create_instance = RestaurantCreate.from_json(json)
# print the JSON string representation of the object
print(RestaurantCreate.to_json())

# convert the object into a dict
restaurant_create_dict = restaurant_create_instance.to_dict()
# create an instance of RestaurantCreate from a dict
restaurant_create_from_dict = RestaurantCreate.from_dict(restaurant_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


