class AICookApp {
    constructor() {
        this.apikey = localStorage.getItem('geminiApikey') || '';

        this.initializeElements();

        this.bindEvents();

        this.loadApikey();

    }

    initializeElements() {
        this.apikeyInput = document.getElementById('apiKey');
        this.saveApiKeyBtn = document.getElementById('saveApiKey');
        this.ingredientsInput = document.getElementById('ingredients');
        this.dietarySelect = document.getElementById('dietary');
        this.cuisineSelect = document.getElementById('cuisine');
        this.generateBtn = document.getElementById('generateRecipe');
        this.loading = document.getElementById('loading');
        this.recipeSelection = document.getElementById('recipeSection');
        this.recipeContent = document.getElementById('recipeContent');
    }

    bindEvents() {
        this.saveApiKeyBtn.addEventListener('click', () => this.saveApikey())
        this.generateBtn.addEventListener('click', () => this.generateRecipe());
        this.apikeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveApikey();
            }
        });
        this.ingredientsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateRecipe();
            }
        });
    }


    saveApikey() {
        const apikey = this.apikeyInput.value.trim();
        if (apikey) {
            localStorage.setItem('geminiApikey', apikey);
            this.apikey = apikey
            this.updateApiKeyStatus(true);
            this.showSuccess('Api Key saved successfully')

        } else {
            this.showError('Please enter a valid API key')
        }
    }

    loadApikey() {
        if (this.apikey) {
            this.apikeyInput.value = this.apikey;
            this.updateApiKeyStatus(true);
        } else {
            this.updateApiKeyStatus(false);
        }
    }

    updateApiKeyStatus(isValid) {
        const btn = this.saveApiKeyBtn;
        if (isValid) {
            btn.textContent = 'Saved ✅';
            btn.style.background = '#d28a745';
        } else {
            btn.textContent = 'Save'
            btn.style.background = '#dc3545';
        }
    }


    async generateRecipe() {
        if (!this.apikey) {
            this.showError('Please enter a valid API key');
            return;
        }

        const ingredients = this.ingredientsInput.value.trim();;
        if (!ingredients) {
            this.showError('Please enter some ingredients');
            return;
        }
        this.showLoading(true);
        this.hideRecipe();



        try {
            const recipe = await this.callGeminiApi(ingredients);
            this.displayRecipe(recipe);

        } catch (error) {
            console.error('Error generating recipe:', error);
            this.showError('Failed to generate recipe. Please check you API key and try again.')
        } finally {
            this.showLoading(false);
        }
    }

    async callGeminiApi(ingredients) {
        const dietary = this.dietarySelect.value;
        const cuisine = this.cuisineSelect.value;

        let prompt = `Create a detailed recipe using these ingredients: ${ingredients}.`;
        if (dietary) {
            prompt += `Cusine type shoule be: ${dietary}.`;
        }
        if (cuisine) {
            prompt += `Cusine type shoule be: ${cuisine}.`;
        }

        prompt += `please formate your response as follows:
        - recipe name
        - prep 
        - cook time
        - servings
        - ingredients with quantities
        - instructions (numbered steps)
        - tips (optional)
        make sure the recipe is practical and delicious!
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apikey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 2048,
                        topP: 0.95,
                        topK: 40,
                    },
                })

            })

        if (!response.ok) {
            const errorData = await reponse.json();
            throw new Error(`HTTP error! status: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text.trim();

    }

    displayRecipe(recipeText) {
        const formattedRecipe = this.formatRecipe(recipeText);
        this.recipeContent.innerHTML = formattedRecipe;
        this.showRecipe()
    }

    showRecipe() {
        this.recipeSelection.classList.add('show')
        this.recipeSelection.scrollIntoView({ behavior: 'smooth' });
    }



    formatRecipe(text) {
        text = text.replace(/(^| ) +/gm,'$1')
        text = text.replace(/^- */gm,'')
        text = text.replace(/\*\*(.+?)\*\*/gm,'<strong>$1</strong>')
        text = text.replace(/^(.+)/g,'<h3 class="recipe-title">$1</h3>')
        text = text.replace(/^\*/gm,'•')
        text = text.replace(/^(.+)/gm,'<p>$1</p>')
        return text;
    }


    showSuccess() {
        alert('Sucess! Recipe generated successfully.');
    }

    showLoading(show) {
        if (show) {
            this.loading.classList.add('show');
            this.generateBtn.disabled = true;
            this.generateBtn.textContent = 'Generating...';
        } else {
            this.loading.classList.remove('show');
            this.generateBtn.disabled = false;
            this.generateBtn.textContent = 'Generate Recipe';

        }
    }

    hideRecipe() {
        this.recipeSelection.classList.remove('show');
    }

    showError(v) {
        alert(v)
    }





}

document.addEventListener('DOMContentLoaded', () => new AICookApp());