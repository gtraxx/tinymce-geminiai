<?php
/**
 * Bridge Example for Gemini AI TinyMCE Plugin
 * @author Gerits Aurelien
 * @license GPLv3
 * @link      https://www.magix-cms.com https://www.gerits-aurelien.be/
 */

header('Content-Type: application/json');

// 1. Configuration
// Récupérez votre clé sur https://aistudio.google.com/
$apiKey = 'VOTRE_CLE_API_ICI';
$apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=' . $apiKey;

// 2. Récupération des données du plugin TinyMCE
$input = json_decode(file_get_contents('php://input'), true);
$prompt = $input['prompt'] ?? '';
$context = $input['context'] ?? '';

if (empty($prompt)) {
    echo json_encode(['status' => 'error', 'message' => 'L\'instruction est vide.']);
    exit;
}

// 3. Construction du Prompt pour un retour HTML propre
$fullPrompt = "Tu es un assistant de rédaction intégré à un éditeur de texte.
Instruction : " . $prompt . "
Contexte HTML actuel : " . $context . "

Réponds EXCLUSIVEMENT en code HTML sémantique. 
Ne mets pas de balises ```html au début ou à la fin.
Ne génère pas de structure <html> ou <body>, juste le contenu.";

$data = [
    'contents' => [
        ['parts' => [['text' => $fullPrompt]]]
    ]
];

// 4. Appel API via CURL
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur API Gemini (Code ' . $httpCode . ')']);
    exit;
}

$result = json_decode($response, true);
$aiText = $result['candidates'][0]['content']['parts'][0]['text'] ?? '';

// 5. Réponse
echo json_encode([
    'status' => 'success',
    'html' => $aiText
]);