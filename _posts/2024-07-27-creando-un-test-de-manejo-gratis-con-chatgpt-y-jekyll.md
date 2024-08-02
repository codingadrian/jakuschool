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
- El "[Manual del Conductor](/assets/misc/Manual%20del%20Conductor.pdf)" de Costa Rica en formato PDF
- Una cuenta Pro de ChatGPT ejecutando la versión 4o
- VSCode, GitHub Pages y Jekyll.

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

  El examen se compone de una pregunta con tres opciones de selección múltiple, entre ellas la respuesta correcta. Incluye una imagen en los casos que lo requiera. Además, el examen brindará una breve explicación dependiendo de si la respuesta es correcta o incorrecta.

### Configurando Jekyll
Jekyll fue elegido por su simplicidad y flexibilidad. Estoy usando este blog para publicar el examen. Pero si te interesa saber como montar tu blog, te comparto la guía aquí: [Jekyll](https://jekyllrb.com/) 


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
Utilicé JavaScript básico para randomizar y mostrar 40 preguntas del conjunto de 500. Aquí tienes un fragmento del script principal que se agrega en el archivo `quiz.md`:


```markdown
---
layout: default
title: Conductor's Test
---

### Conductor's Test

[comment]: Esto crea el marco para el examen (pregunta + respuestas), el botón para entregar los resultados, y la caja que depliega la explicación.

<form id="quiz-form"></form>
<button type="button" onclick="checkAnswers()">Completar</button>
<div id="results"></div>

<script>
    // Esto asegura que el script corra hasta que el contenido de la página se ha cargado.
document.addEventListener('DOMContentLoaded', (event) => {
    // Esto obtiene el archivo que contiene las preguntas y lo procesa
    fetch('/assets/questions.json')
        .then(response => response.json())
        .then(data => {
            // Esto define el total de las preguntas
            const totalQuestions = 40;
            // Esto es el objeto de las preguntas seleccionadas
            const selectedQuestions = [];
            // Esto es un while loop que selecciona un número aleatorio de preguntas hasta completar 40
            while (selectedQuestions.length < totalQuestions) {
                const randomIndex = Math.floor(Math.random() * data.length);
                // Esto revisa si la pregunta ya fue includa, de no ser así, la incluye en el array
                if (!selectedQuestions.includes(data[randomIndex])) {
                    selectedQuestions.push(data[randomIndex]);
                }
            }
            // Esto inicia el formulario que contiene el examen
            const form = document.getElementById('quiz-form');
            // Esto crea un div para cada uno de las preguntas
            selectedQuestions.forEach((question, index) => {
                const div = document.createElement('div');
                // Esto define la estructura del HTML para desplegar la pregunta y también une la explicación cuando se completa
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

// Esta es la función que revisa las respuestas
function checkAnswers() {
    // Esto obtiene el archivo que contiene las preguntas y respuestas
    fetch('/assets/questions.json')
        .then(response => response.json())
        .then(data => {
            // Esto pone a nota en 0
            let score = 0;
            const form = document.getElementById('quiz-form');
            const totalQuestions = form.querySelectorAll('div').length;

            // Esto revisa la pregunta seleccionada contra la respuesta correct y muestra la explicación
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

            // Esto muestra la nota final
            const percentage = (score / totalQuestions) * 100;
            document.getElementById('results').innerText = `You scored ${score} out of ${totalQuestions} (${percentage}%)`;
        });
}
</script>
```


### Estilizando el Quiz
Utilicé CSS para centrar imágenes y mejorar el diseño. Aquí tienes un fragmento clave:

```css
.feedback {
    margin-top: 10px;
    font-weight: bold;
}

button {
    padding: 6px 20px;
    background-color: #3d61fd !important;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}


img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 5vw; /* Adjust the width as needed */
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