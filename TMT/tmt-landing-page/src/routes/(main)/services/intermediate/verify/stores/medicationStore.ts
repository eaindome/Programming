// src/lib/stores/medicationStore.ts
import { writable } from 'svelte/store';

// Define types
export interface EnvironmentalConditions {
  temperature: string;
  humidity: string;
}

export interface Transaction {
  timestamp: string;
  actor: string;
  action: string;
  location: string;
  conditions?: EnvironmentalConditions;
}

export interface ProductDetails {
  name: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  productionDate: string;
}

export interface VerificationResult {
  isAuthentic: boolean;
  message: string;
  productDetails: ProductDetails | null;
  transactionHistory: Transaction[] | null;
}

// Initial state
const initialState = {
  batchNumber: '',
  isScanning: false,
  isVerifying: false,
  verificationResult: null as VerificationResult | null,
};

// Create the store
function createMedicationStore() {
  const { subscribe, set, update } = writable(initialState);
  
  return {
    subscribe,
    setBatchNumber: (batchNumber: string) => update(state => ({ ...state, batchNumber })),
    toggleScanner: () => update(state => ({ ...state, isScanning: !state.isScanning })),
    startVerification: () => update(state => ({ ...state, isVerifying: true })),
    setVerificationResult: (result: VerificationResult) => 
      update(state => ({ ...state, verificationResult: result, isVerifying: false })),
    reset: () => set(initialState),
    
    // Simulate verification with our dummy data
    verifyMedication: (batchNumber: string) => {
      update(state => ({ ...state, isVerifying: true }));
      
      // In a real app, this would be an API call to the blockchain
      setTimeout(() => {
        // Dummy verification logic
        const isAuthentic = batchNumber === 'TMT12345678' || Math.random() > 0.3;
        
        const result: VerificationResult = isAuthentic 
          ? {
              isAuthentic: true,
              message: 'Medication verified as authentic',
              productDetails: {
                name: 'Amoxicillin 500mg',
                manufacturer: 'PharmaCorp Inc.',
                batchNumber: batchNumber || 'TMT12345678',
                expiryDate: '2026-04-15',
                productionDate: '2024-04-15'
              },
              transactionHistory: [
                {
                  timestamp: '2024-04-15 08:23:45',
                  actor: 'PharmaCorp Manufacturing',
                  action: 'Production',
                  location: 'Boston, MA, USA',
                  conditions: {
                    temperature: '21°C',
                    humidity: '45%'
                  }
                },
                {
                  timestamp: '2024-04-17 14:12:30',
                  actor: 'MedLogistics Distribution',
                  action: 'Warehouse Receipt',
                  location: 'Chicago, IL, USA',
                  conditions: {
                    temperature: '19°C',
                    humidity: '40%'
                  }
                },
                {
                  timestamp: '2024-04-22 09:45:12',
                  actor: 'RegionalMeds Distributor',
                  action: 'Regional Distribution',
                  location: 'Denver, CO, USA',
                  conditions: {
                    temperature: '20°C',
                    humidity: '38%'
                  }
                },
                {
                  timestamp: '2024-04-25 11:32:18',
                  actor: 'HealthPlus Pharmacy',
                  action: 'Pharmacy Receipt',
                  location: 'Boulder, CO, USA',
                  conditions: {
                    temperature: '22°C',
                    humidity: '35%'
                  }
                }
              ]
            }
          : {
              isAuthentic: false,
              message: 'WARNING: Potential counterfeit or supply chain deviation detected',
              productDetails: null,
              transactionHistory: null
            };
        
        update(state => ({ ...state, verificationResult: result, isVerifying: false }));
      }, 1500);
    }
  };
}

export const medicationStore = createMedicationStore();