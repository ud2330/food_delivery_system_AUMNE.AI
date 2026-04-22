# Food Delivery System

Professional Full-Stack Food Delivery System built with FastAPI (Backend) and React (Frontend).

## Features
- **JWT Authentication**: Secure signup and login.
- **Restaurant Management**: View open/closed status.
- **Order System**: "Trick Logic" to prevent orders for closed restaurants and duplicate active orders.
- **Real-time Updates**: 5-second polling for restaurant status and order counts.
- **SDK Generation**: Automatically generated Python SDK via OpenAPI Generator.

## Prerequisites
- Python 3.9+
- Node.js 18+

## Setup & Execution

### 1. Automated Setup
Run the following command to set up the virtual environment, install dependencies, and run migrations:
```batch
setupdev.bat
```

### 2. Run Application
Run the following command to start both the backend and frontend in separate windows:
```batch
runapplication.bat
```

## Platform SDK Generation

Follow these steps to generate the Python SDK from the running backend:

1. Ensure the backend is running (`python main.py`).
2. Install the OpenAPI Generator CLI globally:
   ```bash
   npm install -g @openapitools/openapi-generator-cli
   ```
3. Generate the SDK:
   ```bash
   openapi-generator-cli generate -i http://localhost:8000/openapi.json -g python -o food_sdk
   ```

### SDK Usage Example
Once generated, you can use the SDK as follows:

```python
from food_sdk.api.orders_api import OrdersApi
from food_sdk import ApiClient, Configuration, api_client

# Setup Configuration
config = Configuration(host="http://localhost:8000")
client = ApiClient(configuration=config)

# Initialize API
orders_api = OrdersApi(client)

# Example: List restaurants (assuming generated method names)
# result = orders_api.list_restaurants_restaurants__get()
# print(result)
```

## Project Structure
- `/backend`: FastAPI service logic.
- `/frontend`: React + Tailwind CSS client.
- `/alembic`: Database migrations.
- `seed_data.sql`: Initial test data.
- `requirements.txt`: Python dependencies.
