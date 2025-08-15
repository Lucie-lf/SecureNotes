export const generateVerificationToken = () => Math.floor(100000 + Math.random() * 900000).toString();
// Fonction générant un token de vérification aléatoire à 6 chiffres