import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5mzJAksS3BTOrVvacA_-5nflt2r1j2fk",
  authDomain: "sindis-firebase-181b1.firebaseapp.com",
  projectId: "sindis-firebase-181b1",
  storageBucket: "sindis-firebase-181b1.appspot.com",
  messagingSenderId: "937963733281",
  appId: "1:937963733281:web:dc75743caeaac3afda3e60",
  measurementId: "G-R7G74NRYB2",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

/**
 * Sube un archivo a firebase storage
 * @param {File} file archivo a subir
 * @returns {Promise<string>} url de la imagen subida
 */

export async function uploadFile(file) {
  const storageRef = ref(storage, "imagenes/" + file.name);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
