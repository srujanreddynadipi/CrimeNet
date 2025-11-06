import React, { useState, useEffect } from 'react';
import { getAllActiveAlerts, updateSOSStatus } from '../../api/sos';
import { MapPin, Clock, AlertCircle, CheckCircle, X, Navigation } from 'lucide-react';

const SOSMonitoring = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAlerts = async () => {
    try {
      setError('');
      const data = await getAllActiveAlerts();
      setAlerts(data || []);
    } catch (err) {
      console.error('Error fetching SOS alerts:', err);
      setError('Failed to load SOS alerts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    // Poll every 10 seconds for new alerts
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (sosId, newStatus) => {
    try {
      setUpdatingId(sosId);
      await updateSOSStatus(sosId, newStatus);
      await fetchAlerts();
    } catch (err) {
      console.error('Error updating SOS status:', err);
      setError('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity?.toUpperCase()) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'HIGH':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'TRIGGERED':
        return 'bg-red-100 text-red-800';
      case 'RESPONDING':
        return 'bg-orange-100 text-orange-800';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      if (timestamp._seconds) {
        return new Date(timestamp._seconds * 1000).toLocaleString();
      }
      return new Date(timestamp).toLocaleString();
    } catch {
      return 'Invalid date';
    }
  };

  const openInMaps = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 text-center border border-red-100">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent"></div>
        <p className="mt-4 text-slate-700 font-medium">Loading SOS alerts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Live SOS Monitoring</h2>
          <p className="text-slate-600 mt-1">Real-time emergency alerts requiring immediate attention</p>
        </div>
        <button
          onClick={fetchAlerts}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {alerts.length === 0 ? (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-12 text-center border border-green-100">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No Active SOS Alerts</h3>
          <p className="text-slate-600">All emergencies are currently resolved or there are no active alerts.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {alerts.map((alert) => (
            <div
              key={alert.sosId}
              className={`bg-gradient-to-br from-white to-red-50/30 rounded-2xl shadow-lg border-l-4 ${
                alert.status === 'TRIGGERED' ? 'border-red-500 animate-pulse' : 'border-orange-500'
              } p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${getSeverityColor(alert.severity || 'HIGH')}`}>
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-800">
                        Emergency Alert #{alert.sosId.substring(0, 8)}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                      {alert.severity && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Triggered: {formatTimestamp(alert.triggeredAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{alert.address || `${alert.latitude}, ${alert.longitude}`}</span>
                        {alert.latitude && alert.longitude && (
                          <button
                            onClick={() => openInMaps(alert.latitude, alert.longitude)}
                            className="ml-2 text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                          >
                            <Navigation className="w-4 h-4" />
                            Open in Maps
                          </button>
                        )}
                      </div>
                      {alert.accuracy && (
                        <div className="text-xs text-slate-500">
                          Location accuracy: ±{Math.round(alert.accuracy)}m
                        </div>
                      )}
                      {alert.notes && (
                        <div className="mt-2 p-3 bg-slate-50 rounded text-slate-700">
                          <strong>Notes:</strong> {alert.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
                {alert.status === 'TRIGGERED' && (
                  <button
                    onClick={() => handleStatusUpdate(alert.sosId, 'RESPONDING')}
                    disabled={updatingId === alert.sosId}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
                  >
                    {updatingId === alert.sosId ? 'Updating...' : 'Mark as Responding'}
                  </button>
                )}
                {(alert.status === 'TRIGGERED' || alert.status === 'RESPONDING') && (
                  <button
                    onClick={() => handleStatusUpdate(alert.sosId, 'RESOLVED')}
                    disabled={updatingId === alert.sosId}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {updatingId === alert.sosId ? 'Updating...' : 'Mark as Resolved'}
                  </button>
                )}
                {alert.mediaStreamUrl && (
                  <a
                    href={alert.mediaStreamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Live Stream
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SOSMonitoring;
