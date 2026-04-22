import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { Store, ShoppingBag, XCircle, RefreshCw, LogOut, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [orderingId, setOrderingId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [restRes, orderRes] = await Promise.all([
        apiClient.get('/restaurants/'),
        apiClient.get('/orders/'),
      ]);
      setRestaurants(restRes.data);
      setOrders(orderRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load + 5-second polling for real-time updates
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const placeOrder = async (restaurantId) => {
    setError('');
    setSuccess('');
    setOrderingId(restaurantId);
    try {
      await apiClient.post('/orders/', { restaurant_id: restaurantId });
      setSuccess('Order placed successfully.');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to place order.');
    } finally {
      setOrderingId(null);
    }
  };

  const cancelOrder = async (orderId) => {
    setError('');
    setSuccess('');
    setCancellingId(orderId);
    try {
      await apiClient.delete(`/orders/${orderId}`);
      setSuccess('Order cancelled successfully.');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to cancel order.');
    } finally {
      setCancellingId(null);
    }
  };

  const activeOrders = orders.filter((o) => o.status === 'active');
  const pastOrders = orders.filter((o) => o.status !== 'active');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <RefreshCw className="animate-spin w-8 h-8 text-primary-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Store className="w-7 h-7 text-primary-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Food Delivery System</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">{user?.email}</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feedback Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-red-900/20 border border-red-800 text-red-400 rounded-xl text-sm"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-green-900/20 border border-green-800 text-green-400 rounded-xl text-sm"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Restaurants Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Store className="w-6 h-6 text-primary-400" />
            <h2 className="text-2xl font-bold text-white">Restaurants</h2>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">Live updates every 5s</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {restaurants.map((restaurant) => {
              const hasActiveOrder = activeOrders.some(
                (o) => o.restaurant_id === restaurant.id
              );
              return (
                <motion.div
                  key={restaurant.id}
                  layout
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white text-lg">{restaurant.name}</h3>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          restaurant.is_open
                            ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800'
                            : 'bg-red-900/30 text-red-400 border border-red-800'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${restaurant.is_open ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        {restaurant.is_open ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mb-4">ID: {restaurant.id}</p>
                  </div>

                  <button
                    onClick={() => placeOrder(restaurant.id)}
                    disabled={!restaurant.is_open || hasActiveOrder || orderingId === restaurant.id}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                      !restaurant.is_open
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        : hasActiveOrder
                        ? 'bg-amber-900/20 text-amber-500 border border-amber-800 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/20'
                    }`}
                  >
                    {orderingId === restaurant.id ? (
                      <RefreshCw className="animate-spin w-4 h-4" />
                    ) : !restaurant.is_open ? (
                      'Restaurant Closed'
                    ) : hasActiveOrder ? (
                      'Active Order Exists'
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Place Order
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Active Orders Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="w-6 h-6 text-primary-400" />
            <h2 className="text-2xl font-bold text-white">Active Orders</h2>
            <span className="text-sm bg-primary-900/30 text-primary-400 px-2.5 py-1 rounded-full">{activeOrders.length}</span>
          </div>

          {activeOrders.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
              <ShoppingBag className="w-10 h-10 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500">No active orders. Place one from the restaurants above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeOrders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-primary-900/30 rounded-lg">
                      <ShoppingBag className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        Order #{order.id} — {order.restaurant?.name || `Restaurant #${order.restaurant_id}`}
                      </p>
                      <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => cancelOrder(order.id)}
                    disabled={cancellingId === order.id}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-800 rounded-xl text-sm font-medium transition-colors"
                  >
                    {cancellingId === order.id ? (
                      <RefreshCw className="animate-spin w-4 h-4" />
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Past Orders Section */}
        {pastOrders.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-slate-500" />
              <h2 className="text-2xl font-bold text-white">Past Orders</h2>
              <span className="text-sm bg-slate-800 text-slate-500 px-2.5 py-1 rounded-full">{pastOrders.length}</span>
            </div>

            <div className="space-y-3">
              {pastOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-5 flex items-center justify-between opacity-60"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-800 rounded-lg">
                      <ShoppingBag className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-300">
                        Order #{order.id} — {order.restaurant?.name || `Restaurant #${order.restaurant_id}`}
                      </p>
                      <p className="text-slate-600 text-sm">{new Date(order.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-slate-800 text-slate-500 px-3 py-1.5 rounded-full font-medium uppercase tracking-wide">
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
