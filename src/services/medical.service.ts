import { API_URL } from './auth.service';
import { getAuthHeaders, handleResponse } from './api.utils';

export const medicalService = {
  /**
   * Medical Records
   */
  async getMedicalRecords(params: any = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/medical-records/list?${query}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  async createMedicalRecord(recordData: any) {
    const res = await fetch(`${API_URL}/medical-records/add`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(recordData),
    });
    return handleResponse(res);
  },

  /**
   * Prescriptions
   */
  async getPrescriptions(params: any = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/prescriptions/list?${query}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  async createPrescription(prescriptionData: any) {
    const res = await fetch(`${API_URL}/prescriptions/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(prescriptionData),
    });
    return handleResponse(res);
  },

  /**
   * Sharing functionality
   */
  async shareRecord(patientId: string, recordContent: string) {
    const res = await fetch(`${API_URL}/notifications/send`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        recipientId: patientId,
        title: 'New Medical Record Shared',
        message: `Your doctor has shared a new medical entry: ${recordContent}`,
        type: 'medical'
      }),
    });
    return handleResponse(res);
  },

  async sharePrescription(patientId: string, prescriptionDetails: string) {
    const res = await fetch(`${API_URL}/notifications/send`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        recipientId: patientId,
        title: 'New Prescription Issued',
        message: `A new digital prescription has been issued: ${prescriptionDetails}`,
        type: 'prescription'
      }),
    });
    return handleResponse(res);
  }
};
