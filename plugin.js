/**
 * TinyMCE Plugin: Gemini AI (Universal Edition)
 * @author    Gerits Aurelien (aurelien@magix-cms.com)
 * @copyright 2026 Gerits Aurélien
 * @license   GPLv3
 * @link      https://www.magix-cms.com https://www.gerits-aurelien.be/
 */

(function () {
    'use strict';
    tinymce.PluginManager.requireLangPack("geminiai");
    tinymce.PluginManager.add('geminiai', function (editor) {

        // 1. Récupération des paramètres de configuration
        const bridgeUrl = editor.getParam('geminiai_bridge_url');
        const defaultPrompt = editor.getParam('geminiai_default_prompt', '');
        const buttonIcon = editor.getParam('geminiai_icon', 'ai-prompt');
        const buttonTooltip = editor.getParam('geminiai_tooltip', 'Gemini AI Assistant');

        // Helper pour la traduction
        const _ = (key) => editor.translate(key);

        const callGemini = function (prompt, selectedText, dialogApi) {
            if (!bridgeUrl) {
                editor.notificationManager.open({
                    text: _('Error: geminiai_bridge_url is not configured.'),
                    type: 'error'
                });
                return;
            }

            dialogApi.block(_('Generating...'));

            fetch(bridgeUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt,
                    context: selectedText,
                    // On peut passer d'autres paramètres si besoin
                    lang: editor.settings.language || 'en'
                })
            })
                .then(response => response.json())
                .then(data => {
                    dialogApi.unblock();
                    if (data.status === 'success' || data.html || data.text) {
                        // On insère le contenu généré
                        editor.insertContent(data.html || data.text);
                        editor.undoManager.add(); // Ajout à l'historique d'annulation
                        dialogApi.close();
                    } else {
                        alert(_('Error: ') + (data.message || _('Invalid server response.')));
                    }
                })
                .catch(error => {
                    dialogApi.unblock();
                    console.error('Gemini Error:', error);
                    alert(_('Error communicating with the bridge.'));
                });
        };

        /**
         * Interface de dialogue
         */
        const openDialog = function () {
            const selectedText = editor.selection.getContent({ format: 'html' });

            return editor.windowManager.open({
                title: _('Gemini AI Assistant'),
                size: 'medium',
                body: {
                    type: 'panel',
                    items: [
                        {
                            type: 'textarea',
                            name: 'prompt',
                            label: _('What would you like to do?'),
                            placeholder: _('Ex: Translate to English, or create a bullet list...'),
                            initialValue: defaultPrompt
                        },
                        {
                            type: 'alertbanner',
                            level: 'info',
                            text: selectedText ? _('The AI will work on the selected text.') : _('The AI will generate new content at the cursor position.'),
                            icon: 'info'
                        }
                    ]
                },
                buttons: [
                    { type: 'cancel', text: _('Cancel') },
                    { type: 'submit', text: _('Generate'), primary: true }
                ],
                onSubmit: function (api) {
                    const data = api.getData();
                    if (!data.prompt) {
                        alert(_('Please enter an instruction.'));
                        return;
                    }
                    callGemini(data.prompt, selectedText, api);
                }
            });
        };

        // Enregistrement du bouton
        editor.ui.registry.addButton('geminiai', {
            icon: buttonIcon,
            tooltip: _(buttonTooltip),
            onAction: openDialog
        });

        // Enregistrement dans le menu "Outils" ou "Insertion"
        editor.ui.registry.addMenuItem('geminiai', {
            text: _('Gemini AI Assistant'),
            icon: buttonIcon,
            onAction: openDialog
        });

        return {
            getMetadata: () => ({
                name: "Gemini AI Universal",
                url: "https://www.magix-cms.com",
                author: "Gerits Aurelien"
            })
        };
    });
})();