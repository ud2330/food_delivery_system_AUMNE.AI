# RestaurantOut


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**name** | **str** |  | 
**is_open** | **bool** |  | 

## Example

```python
from openapi_client.models.restaurant_out import RestaurantOut

# TODO update the JSON string below
json = "{}"
# create an instance of RestaurantOut from a JSON string
restaurant_out_instance = RestaurantOut.from_json(json)
# print the JSON string representation of the object
print(RestaurantOut.to_json())

# convert the object into a dict
restaurant_out_dict = restaurant_out_instance.to_dict()
# create an instance of RestaurantOut from a dict
restaurant_out_from_dict = RestaurantOut.from_dict(restaurant_out_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


