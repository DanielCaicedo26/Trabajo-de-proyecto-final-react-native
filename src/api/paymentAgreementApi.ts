import { API_HOST } from './config';

/**
 * Obtiene todos los acuerdos de pago desde la API.
 * Retorna un array (vacío si no hay datos o si ocurre un error).
 */
export async function fetchAllPaymentAgreements(): Promise<any[]> {
  try {
    const res = await fetch(`${API_HOST}/api/PaymentAgreement`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
    }
    
    const json = await res.json();
    return Array.isArray(json) ? json : (json ? [json] : []);
  } catch (error: any) {
    console.error('Error fetching all payment agreements:', error);
    throw new Error(error.message || 'Error al obtener acuerdos de pago');
  }
}

/**
 * Obtiene los acuerdos de pago filtrados por número de documento.
 * Si no se pasa documentNumber retorna un array vacío.
 */
export async function fetchPaymentAgreementsByDocument(
  documentNumber?: string | number
): Promise<any[]> {
  if (!documentNumber) {
    console.warn('No document number provided to fetchPaymentAgreementsByDocument');
    return [];
  }

  try {
    const all = await fetchAllPaymentAgreements();
    const docNumberStr = String(documentNumber).trim();
    
    const filtered = all.filter(agreement => {
      const agreementDocNumber = String(
        agreement.documentNumber || 
        agreement.document || 
        ''
      ).trim();
      
      return agreementDocNumber === docNumberStr;
    });

    console.log(`Found ${filtered.length} payment agreements for document ${docNumberStr}`);
    return filtered;
  } catch (error: any) {
    console.error('Error fetching payment agreements by document:', error);
    throw error;
  }
}

export default {
  fetchAllPaymentAgreements,
  fetchPaymentAgreementsByDocument,
};
