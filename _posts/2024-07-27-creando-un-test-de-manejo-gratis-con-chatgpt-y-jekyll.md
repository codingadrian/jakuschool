---
layout: post
title:  "Creando un Test de Manejo Gratis con ChatGPT y Jekyll"
author: adrian
categories: [ ChatGPT, Jekyll, Manual del Conductor, Examen Teórico de Manejo ]
image: assets/images/blogs/making-driving-test.png
---

Aprender a conducir siempre ha sido un desafío para mí, principalmente debido a la falta de tiempo y acceso a recursos. Aunque encontré el libro "Manual del Conductor", su formato no era muy amigable. Además, muchos sitios web estaban llenos de anuncios o cobraban por acceder a su contenido. Esto me inspiró a crear un test de manejo en línea gratuito y sin anuncios, usando ChatGPT y Jekyll.

### ¿Por qué ChatGPT y Jekyll?
Elegí ChatGPT por su rapidez en analizar datos, lo que permitió que el test estuviera disponible rápidamente. Jekyll fue seleccionado por su facilidad de configuración y adecuación para la generación de sitios estáticos, proporcionando una plataforma para contenido interactivo. Dado que ya tenía experiencia con Jekyll, fue una elección natural y se alinea con mi creencia en hacer la tecnología accesible para principiantes.

### Recursos
Para este proyecto, utilicé:
- El "Manual del Conductor" en formato PDF
- Una cuenta Pro de ChatGPT ejecutando la versión 4.0
- Mis ideas y determinación

### Usando ChatGPT
Usé ChatGPT para generar las preguntas y respuestas. Aquí tienes un resumen paso a paso de mis interacciones:

1. **Configuración Inicial:** Subí el PDF y discutí la estructura del test con ChatGPT.
2. **Generación de Preguntas:** Usando una serie de prompts, ChatGPT extrajo información clave y formuló preguntas en formato de opción múltiple.
3. **Formateo y Validación:** ChatGPT me ayudó a decidir el mejor formato para las preguntas y validar las respuestas.

#### Ejemplos de Prompts y Respuestas
- **Prompt:** "Genera una pregunta basada en la señal de límite de velocidad de 60 km/h."
- **Respuesta:**
  ```json
  {
      "question": "¿Qué indica la siguiente señal de tránsito?",
      "options": ["Límite de velocidad de 80 km/h", "Límite de velocidad de 60 km/h", "Límite de velocidad de 100 km/h"],
      "correct": "Límite de velocidad de 60 km/h",
      "image": "/assets/images/speed_limit_60.jpg",
      "positiveFeedback": "Correcto. La señal indica un límite de velocidad de 60 km/h.",
      "negativeFeedback": "Incorrecto. La señal indica un límite de velocidad de 60 km/h."
  }
  ```

### Configurando Jekyll
Jekyll fue elegido por su simplicidad y flexibilidad. Aquí te explico cómo configuré el sitio con Jekyll:

1. **Instalación:**
   ```bash
   gem install jekyll bundler
   jekyll new mysite
   cd mysite
   bundle exec jekyll serve
   ```
2. **Configuración:** Actualicé `_config.yml` con los detalles del sitio y las preferencias de tema.
3. **Agregando Contenido:** Creé archivos markdown para las diferentes secciones del sitio.

### Integrando el Quiz
Estructuré el archivo JSON para almacenar las preguntas y respuestas del quiz. Aquí tienes un ejemplo:

```json
[
  {
      "question": "¿Qué indica la siguiente señal de tránsito?",
      "options": ["Límite de velocidad de 80 km/h", "Límite de velocidad de 60 km/h", "Límite de velocidad de 100 km/h"],
      "correct": "Límite de velocidad de 60 km/h",
      "image": "/assets/images/speed_limit_60.jpg",
      "positiveFeedback": "Correcto. La señal indica un límite de velocidad de 60 km/h.",
      "negativeFeedback": "Incorrecto. La señal indica un límite de velocidad de 60 km/h."
  }
]
```

### Agregando Funcionalidad
Utilicé JavaScript básico para randomizar y mostrar 40 preguntas del conjunto de 200. Aquí tienes un fragmento del script principal que se agrega en el archivo `quiz.md`:


```markdown
---
layout: default
title: Conductor's Test
---

### Conductor's Test

<form id="quiz-form"></form>
<button type="button" onclick="checkAnswers()">Submit</button>
<div id="results"></div>

<script>
document.addEventListener('DOMContentLoaded', (event) => {
    fetch('/assets/questions.json')
        .then(response => response.json())
        .then(data => {
            const totalQuestions = 40;
            const selectedQuestions = [];
            while (selectedQuestions.length < totalQuestions) {
                const randomIndex = Math.floor(Math.random() * data.length);
                if (!selectedQuestions.includes(data[randomIndex])) {
                    selectedQuestions.push(data[randomIndex]);
                }
            }

            const form = document.getElementById('quiz-form');
            selectedQuestions.forEach((question, index) => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <p>${question.question}</p>
                    ${question.image ? `<img src="${question.image}" alt="Question Image"><br>` : ''}
                    ${question.options.map((option, i) => `
                        <label><input type="radio" name="q${index + 1}" value="${option}"> ${option}</label><br>
                    `).join('')}
                    <div id="feedback${index + 1}" class="feedback"></div>
                    <hr>
                `;
                form.appendChild(div);
            });
        });
});

function checkAnswers() {
    fetch('/assets/questions.json')
        .then(response => response.json())
        .then(data => {
            let score = 0;
            const form = document.getElementById('quiz-form');
            const totalQuestions = form.querySelectorAll('div').length;

            for (let i = 1; i <= totalQuestions; i++) {
                const answer = document.querySelector(`input[name="q${i}"]:checked`);
                const feedbackDiv = document.getElementById(`feedback${i}`);
                const correctAnswer = data.find(q => q.question === document.querySelector(`p`).innerText).correct;
                const positiveFeedback = data.find(q => q.question === document.querySelector(`p`).innerText).positiveFeedback;
                const negativeFeedback = data.find(q => q.question === document.querySelector(`p`).innerText).negativeFeedback;

                if (answer && answer.value === correctAnswer) {
                    score++;
                    feedbackDiv.innerHTML = `<p style="color: green;">${positiveFeedback}</p>`;
                } else {
                    feedbackDiv.innerHTML = `<p style="color: red;">${negativeFeedback}</p>`;
                }
            }

            const percentage = (score / totalQuestions) * 100;
            document.getElementById('results').innerText = `You scored ${score} out of ${totalQuestions} (${percentage}%)`;
        });
}
</script>
```


### Estilizando el Quiz
Utilicé CSS para centrar imágenes y mejorar el diseño. Aquí tienes un fragmento clave:

```css
.center-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%; /* Ajustar según sea necesario */
}
```

### Pruebas y Despliegue
Probé la funcionalidad del quiz localmente antes de desplegarlo en GitHub Pages. Aquí tienes el proceso de despliegue:

1. **Push a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <url-del-repositorio>
   git push -u origin master
   ```
2. **Habilitar GitHub Pages:** Navega a la configuración del repositorio y habilita GitHub Pages en la sección "Pages".

### Desafíos y Soluciones
Un desafío fue asegurar que las imágenes y preguntas coincidieran correctamente. Esto se superó mediante una revisión meticulosa y usando convenciones de nombres consistentes para las imágenes.

### Características Adicionales
Mejoras futuras podrían incluir más elementos interactivos y recolección de feedback de los usuarios. Este proyecto es de código abierto, invitando a contribuciones de otros.

### Conclusión
De este proyecto aprendí sobre la versatilidad de Jekyll y el poder de combinarlo con ChatGPT. Esta experiencia reforzó la importancia de los recursos de aprendizaje accesibles y el potencial de la tecnología para mejorar la educación.

Pudes encontrar el examen aquí: [Examen Teórico de Manejo](http://jakuschool.com/examen-manual-del-conductor/)