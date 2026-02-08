<?php
/**
 * Bridge Example using Official Gemini PHP Library
 * Installation: composer require google-gemini-php/client
 * @author Gerits Aurelien
 * @license GPLv3
 * @link      https://www.magix-cms.com https://www.gerits-aurelien.be/
 */

require_once __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json');

$apiKey = 'VOTRE_CLE_API_ICI';
$client = Gemini::client($apiKey);

// Récupération des données TinyMCE
$input = json_decode(file_get_contents('php://input'), true);
$prompt = $input['prompt'] ?? '';
$context = $input['context'] ?? '';

try {
    // Construction du prompt avec consignes HTML
    $fullPrompt = "Instructions: $prompt \n Context: $context \n Respond only in semantic HTML.";

    $result = $client->geminiFlash()->generateContent($fullPrompt);

    echo json_encode([
        'status' => 'success',
        'html' => $result->text()
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erreur Library: ' . $e->getMessage()
    ]);
}