import firebase from "firebase/app";
import 'firebase/auth';

// Configurações do Firebase extraídas das suas variáveis de ambiente
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    
    // CORREÇÃO GAPI/COOP: Força a persistência local explicitamente no momento da inicialização.
    // Isso diz ao SDK do Firebase para ler o estado local imediatamente, evitando que os scripts 
    // internos do Google (gapi) iniciem buscas redundantes por janelas de autenticação.
    if (typeof window !== 'undefined') {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .catch((error) => console.warn("Erro ao configurar persistência do Firebase:", error));
    }
}

export default firebase;