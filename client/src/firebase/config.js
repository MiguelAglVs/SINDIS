import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNeKmgMMonXR1gAFGdQExSpNjx2No7EM0",
  authDomain: "sindis-firebase.firebaseapp.com",
  projectId: "sindis-firebase",
  storageBucket: "sindis-firebase.appspot.com",
  messagingSenderId: "859247543909",
  appId: "1:859247543909:web:dd81d54665a5373102e88c",
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
