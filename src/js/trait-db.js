/**
 * Trait Database
 * A module for handling trait data storage and retrieval using IndexedDB
 */

// Database configuration
const DB_NAME = 'ChickenTraitsDB';
const DB_VERSION = 1;
const TRAIT_STORE = 'traits';
const VARIANT_STORE = 'variants';

// Initialize the database
export function initDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      console.log('Database opened successfully');
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create traits store - for base trait types
      if (!db.objectStoreNames.contains(TRAIT_STORE)) {
        const traitStore = db.createObjectStore(TRAIT_STORE, { keyPath: 'id' });
        traitStore.createIndex('name', 'name', { unique: false });
        traitStore.createIndex('category', 'category', { unique: false });
      }
      
      // Create variants store - for individual variants of each trait
      if (!db.objectStoreNames.contains(VARIANT_STORE)) {
        const variantStore = db.createObjectStore(VARIANT_STORE, { keyPath: 'id' });
        variantStore.createIndex('traitId', 'traitId', { unique: false });
        variantStore.createIndex('name', 'name', { unique: false });
        variantStore.createIndex('live', 'live', { unique: false });
      }
    };
  });
}

// Get a database connection
export function getDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      console.error('Database connection error:', event.target.error);
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}

// Add or update a trait
export async function saveTrait(trait) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TRAIT_STORE, 'readwrite');
    const store = tx.objectStore(TRAIT_STORE);
    const request = store.put(trait);
    
    request.onerror = (event) => {
      console.error('Error saving trait:', event.target.error);
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}

// Add or update a variant
export async function saveVariant(variant) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(VARIANT_STORE, 'readwrite');
    const store = tx.objectStore(VARIANT_STORE);
    const request = store.put(variant);
    
    request.onerror = (event) => {
      console.error('Error saving variant:', event.target.error);
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}

// Get a trait by id
export async function getTraitById(traitId) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TRAIT_STORE, 'readonly');
    const store = tx.objectStore(TRAIT_STORE);
    const request = store.get(traitId);
    
    request.onerror = (event) => {
      console.error('Error getting trait:', event.target.error);
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      resolve(request.result);
    };
  });
}

// Get all traits
export async function getAllTraits() {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TRAIT_STORE, 'readonly');
    const store = tx.objectStore(TRAIT_STORE);
    const request = store.getAll();
    
    request.onerror = (event) => {
      console.error('Error getting all traits:', event.target.error);
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      resolve(request.result);
    };
  });
}

// Get a variant by id
export async function getVariantById(variantId) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(VARIANT_STORE, 'readonly');
    const store = tx.objectStore(VARIANT_STORE);
    const request = store.get(variantId);
    
    request.onerror = (event) => {
      console.error('Error getting variant:', event.target.error);
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      resolve(request.result);
    };
  });
}

// Get all variants for a trait
export async function getVariantsByTraitId(traitId) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(VARIANT_STORE, 'readonly');
    const store = tx.objectStore(VARIANT_STORE);
    const index = store.index('traitId');
    const request = index.getAll(traitId);
    
    request.onerror = (event) => {
      console.error('Error getting variants:', event.target.error);
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      resolve(request.result);
    };
  });
}

// Get all variants
export async function getAllVariants() {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(VARIANT_STORE, 'readonly');
    const store = tx.objectStore(VARIANT_STORE);
    const request = store.getAll();
    
    request.onerror = (event) => {
      console.error('Error getting all variants:', event.target.error);
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      resolve(request.result);
    };
  });
}

// Delete a trait (and all its variants)
export async function deleteTrait(traitId) {
  const db = await getDatabase();
  
  // First delete all variants for this trait
  const variants = await getVariantsByTraitId(traitId);
  
  // Start transaction
  return new Promise((resolve, reject) => {
    const tx = db.transaction([TRAIT_STORE, VARIANT_STORE], 'readwrite');
    
    // Delete the trait
    const traitStore = tx.objectStore(TRAIT_STORE);
    traitStore.delete(traitId);
    
    // Delete all variants
    const variantStore = tx.objectStore(VARIANT_STORE);
    variants.forEach(variant => {
      variantStore.delete(variant.id);
    });
    
    tx.oncomplete = () => {
      resolve();
    };
    
    tx.onerror = (event) => {
      console.error('Error deleting trait:', event.target.error);
      reject(event.target.error);
    };
  });
}

// Delete a variant
export async function deleteVariant(variantId) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(VARIANT_STORE, 'readwrite');
    const store = tx.objectStore(VARIANT_STORE);
    const request = store.delete(variantId);
    
    request.onerror = (event) => {
      console.error('Error deleting variant:', event.target.error);
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      resolve();
    };
  });
} 