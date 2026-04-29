import api from './api';

export const medicalService = {
  /**
   * Medical Records
   */
  async getMedicalRecords(params: any = {}) {
    const response = await api.get('/medical-records/list', { params });
    return response.data;
  },

  async createMedicalRecord(recordData: any) {
    const response = await api.post('/medical-records/add', recordData);
    return response.data;
  },

  /**
   * Prescriptions
   */
  async getPrescriptions(params: any = {}) {
    const response = await api.get('/prescriptions/list', { params });
    return response.data;
  },

  async createPrescription(prescriptionData: any) {
    const response = await api.post('/prescriptions/create', prescriptionData);
    return response.data;
  },

  /**
   * Sharing functionality
   */
  async shareRecord(patientId: string, recordContent: string) {
    const response = await api.post('/notifications/send', {
      recipientId: patientId,
      title: 'New Medical Record Shared',
      message: `Your doctor has shared a new medical entry: ${recordContent}`,
      type: 'medical'
    });
    return response.data;
  },

  async sharePrescription(patientId: string, prescriptionDetails: string) {
    const response = await api.post('/notifications/send', {
      recipientId: patientId,
      title: 'New Prescription Issued',
      message: `A new digital prescription has been issued: ${prescriptionDetails}`,
      type: 'prescription'
    });
    return response.data;
  }
};
