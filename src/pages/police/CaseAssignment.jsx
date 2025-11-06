import React, { useState, useEffect } from 'react';
import { getReportsByStatus, assignOfficer, updateReportStatus } from '../../api/reports';
import { getUsersByRole } from '../../api/users';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, User, Clock, MapPin, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

const CaseAssignment = () => {
  const { currentUser } = useAuth();
  const [unassignedReports, setUnassignedReports] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedOfficer, setSelectedOfficer] = useState('');
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError('');
      setLoading(true);
      
      // Fetch unassigned reports (SUBMITTED status)
      const reportsData = await getReportsByStatus('SUBMITTED');
      setUnassignedReports(reportsData || []);
      
      // Fetch all police officers
      const officersData = await getUsersByRole('POLICE');
      setOfficers(officersData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load case assignment data');
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedReport || !selectedOfficer) {
      setError('Please select both a report and an officer');
      return;
    }

    try {
      setAssigning(true);
      setError('');
      
      // Assign officer
      await assignOfficer(selectedReport.reportId, selectedOfficer);
      
      // Update status to UNDER_INVESTIGATION
      await updateReportStatus(selectedReport.reportId, 'UNDER_INVESTIGATION', 'Case assigned to officer');
      
      // Refresh data
      await fetchData();
      
      // Reset selection
      setSelectedReport(null);
      setSelectedOfficer('');
      
      alert('Case assigned successfully!');
    } catch (err) {
      console.error('Error assigning case:', err);
      setError('Failed to assign case');
    } finally {
      setAssigning(false);
    }
  };

  const handleSelfAssign = async (report) => {
    if (!currentUser) return;
    
    try {
      setError('');
      await assignOfficer(report.reportId, currentUser.uid);
      await updateReportStatus(report.reportId, 'UNDER_INVESTIGATION', 'Self-assigned by officer');
      await fetchData();
      alert('Case assigned to you successfully!');
    } catch (err) {
      console.error('Error self-assigning:', err);
      setError('Failed to self-assign case');
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority?.toUpperCase()) {
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

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl shadow-xl p-8 text-center border border-cyan-100">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-slate-700 font-medium">Loading cases...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-100">
        <h2 className="text-2xl font-bold text-slate-800">Case Assignment</h2>
        <p className="text-slate-600 mt-1">Assign unassigned cases to officers for investigation</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {unassignedReports.length === 0 ? (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-12 text-center border border-green-100">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No Unassigned Cases</h3>
          <p className="text-slate-600">All submitted reports have been assigned to officers.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Cases List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-100">Unassigned Reports ({unassignedReports.length})</h3>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {unassignedReports.map((report) => (
                <div
                  key={report.reportId}
                  onClick={() => setSelectedReport(report)}
                  className={`bg-gradient-to-br rounded-xl shadow-md border-2 p-4 cursor-pointer transition ${
                    selectedReport?.reportId === report.reportId
                      ? 'border-indigo-600 from-indigo-50 to-purple-50'
                      : 'border-slate-200 hover:border-indigo-400 from-white to-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold text-slate-800">
                        Case #{report.caseNumber}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </div>

                  <h4 className="font-medium text-slate-800 mb-2">{report.title}</h4>
                  
                  <div className="space-y-1 text-sm text-slate-600">
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
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelfAssign(report);
                    }}
                    className="mt-3 w-full px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                  >
                    Assign to Me
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Assignment Panel */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Assign Case</h3>
            
            {selectedReport ? (
              <div className="space-y-6">
                {/* Selected Report Details */}
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <h4 className="font-semibold text-slate-800 mb-2">Selected Case</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Case #:</strong> {selectedReport.caseNumber}</p>
                    <p><strong>Title:</strong> {selectedReport.title}</p>
                    <p><strong>Category:</strong> {selectedReport.category}</p>
                    <p><strong>Priority:</strong> {selectedReport.priority}</p>
                    <p><strong>Description:</strong> {selectedReport.description}</p>
                  </div>
                </div>

                {/* Officer Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Officer
                  </label>
                  <select
                    value={selectedOfficer}
                    onChange={(e) => setSelectedOfficer(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  >
                    <option value="">Choose an officer...</option>
                    {officers.map((officer) => (
                      <option key={officer.uid} value={officer.uid}>
                        {officer.fullName} ({officer.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assign Button */}
                <button
                  onClick={handleAssign}
                  disabled={!selectedOfficer || assigning}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {assigning ? 'Assigning...' : 'Assign Case'}
                </button>

                <button
                  onClick={() => {
                    setSelectedReport(null);
                    setSelectedOfficer('');
                  }}
                  className="w-full px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select a case from the list to assign it to an officer</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseAssignment;
