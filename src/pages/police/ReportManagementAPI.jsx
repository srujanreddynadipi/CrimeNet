import React, { useState, useEffect } from 'react';
import { getAllReports, updateReportStatus, getReportTimeline } from '../../api/reports';
import { FileText, Filter, Search, Clock, MapPin, User, AlertCircle, Eye, History } from 'lucide-react';

const ReportManagementAPI = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedReport, setSelectedReport] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, statusFilter, priorityFilter, categoryFilter]);

  const fetchReports = async () => {
    try {
      setError('');
      const data = await getAllReports();
      setReports(data || []);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.caseNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'ALL') {
      filtered = filtered.filter((r) => r.priority === priorityFilter);
    }

    // Category filter
    if (categoryFilter !== 'ALL') {
      filtered = filtered.filter((r) => r.category === categoryFilter);
    }

    setFilteredReports(filtered);
  };

  const fetchTimeline = async (reportId) => {
    try {
      const timelineData = await getReportTimeline(reportId);
      setTimeline(timelineData || []);
      setShowTimeline(true);
    } catch (err) {
      console.error('Error fetching timeline:', err);
      setError('Failed to load timeline');
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedReport || !newStatus) {
      setError('Please select a status');
      return;
    }

    try {
      setUpdating(true);
      setError('');
      await updateReportStatus(selectedReport.reportId, newStatus, statusNote);
      await fetchReports();
      setSelectedReport(null);
      setNewStatus('');
      setStatusNote('');
      alert('Status updated successfully!');
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800';
      case 'UNDER_INVESTIGATION':
        return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toUpperCase()) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'HIGH':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'LOW':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
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

  const categories = ['ALL', 'THEFT', 'ASSAULT', 'BURGLARY', 'VANDALISM', 'FRAUD', 'CYBERCRIME', 'DRUG_OFFENSE', 'OTHER'];
  const statuses = ['ALL', 'SUBMITTED', 'UNDER_INVESTIGATION', 'RESOLVED', 'CLOSED', 'REJECTED'];
  const priorities = ['ALL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-slate-600">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Report Management</h2>
        <p className="text-slate-600 mt-1">Manage and track all crime reports</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-slate-600" />
          <h3 className="font-semibold text-slate-800">Filters</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reports..."
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          Showing {filteredReports.length} of {reports.length} reports
        </div>
      </div>

      {/* Reports List */}
      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <div key={report.reportId} className="bg-white rounded-lg shadow border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-800">{report.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-3">{report.description}</p>

                  <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Case #{report.caseNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Category:</span>
                      <span>{report.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{report.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Reported: {formatTimestamp(report.createdAt)}</span>
                    </div>
                    {report.assignedOfficerId && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Assigned: {report.assignedOfficerId.substring(0, 8)}...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setSelectedReport(report);
                  setNewStatus(report.status);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Update Status
              </button>
              <button
                onClick={() => fetchTimeline(report.reportId)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition flex items-center gap-2"
              >
                <History className="w-4 h-4" />
                View Timeline
              </button>
            </div>
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Reports Found</h3>
            <p className="text-slate-600">No reports match your current filters.</p>
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Update Report Status</h3>
            
            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">
                <strong>Case:</strong> #{selectedReport.caseNumber}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Current Status:</strong> {selectedReport.status}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                >
                  <option value="SUBMITTED">SUBMITTED</option>
                  <option value="UNDER_INVESTIGATION">UNDER INVESTIGATION</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Note (Optional)
                </label>
                <textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  rows={3}
                  placeholder="Add a note about this status change..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleStatusUpdate}
                disabled={updating}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update'}
              </button>
              <button
                onClick={() => {
                  setSelectedReport(null);
                  setNewStatus('');
                  setStatusNote('');
                }}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Modal */}
      {showTimeline && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Report Timeline</h3>
            
            {timeline.length === 0 ? (
              <p className="text-slate-600">No timeline entries found.</p>
            ) : (
              <div className="space-y-4">
                {timeline.map((entry, index) => (
                  <div key={entry.timelineId || index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                      {index < timeline.length - 1 && <div className="w-0.5 h-full bg-slate-300 my-1"></div>}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-800">
                          {entry.statusFrom} → {entry.statusTo}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-slate-600 mb-1">{entry.note}</p>
                      )}
                      <p className="text-xs text-slate-500">
                        {formatTimestamp(entry.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowTimeline(false)}
              className="mt-6 w-full px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportManagementAPI;
