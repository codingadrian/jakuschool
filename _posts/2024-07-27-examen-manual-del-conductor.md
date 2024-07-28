---
layout: post
title:  "Examen Manual del Conductor"
author: adrian
categories: [ manual del conductor, examen teorico ]
image: assets/images/blogs/creative-writing.png
---

¡Bienvenidos al Examen del Manual del Conductor! Este examen está diseñado para ayudarte a prepararte para la prueba teórica de conducción, basada en el contenido del "Manual del Conductor" de Costa Rica. Entendemos que prepararse para el examen de manejo puede ser un desafío, especialmente cuando el tiempo es limitado y los recursos disponibles no siempre son accesibles o fáciles de usar.

Este examen interactivo te ofrece una manera efectiva y gratuita de practicar y evaluar tus conocimientos sobre las señales de tránsito, normas de seguridad vial y otros aspectos importantes de la conducción. Hemos trabajado arduamente para asegurar que el formato sea amigable y libre de distracciones como anuncios, permitiéndote concentrarte en lo que realmente importa: tu aprendizaje.

## ¿Cómo funciona?
Preguntas Aleatorias: Cada vez que inicies el examen, se seleccionarán aleatoriamente 40 preguntas de un banco de 200 preguntas. Esto garantiza que tengas una experiencia única en cada intento.

Formato de Preguntas: Las preguntas son de selección múltiple, con tres opciones de respuesta, pero solo una es correcta.

Imágenes Incluidas: Algunas preguntas incluyen imágenes para ayudarte a identificar señales de tránsito y otras situaciones viales.

Retroalimentación Inmediata: Después de responder cada pregunta, recibirás una retroalimentación inmediata, indicándote si tu respuesta fue correcta o incorrecta, y proporcionando una explicación para reforzar tu aprendizaje.

## Objetivo del Examen
El objetivo de este examen es proporcionar una herramienta de estudio accesible y eficaz para todos aquellos que deseen obtener su licencia de conducir en Costa Rica. 

Queremos ayudarte a ganar confianza y asegurarte de que estás bien preparado para el examen oficial.

## Recomendaciones
Revisa el Manual del Conductor: Aunque este examen es una excelente herramienta de práctica, te recomendamos que también leas el [Manual del Conductor](https://github.com/codingadrian/ManualConductor) completo para una comprensión más profunda de todas las normas y regulaciones.

Practica Regularmente: Cuantas más veces realices el examen, más familiarizado estarás con el formato de las preguntas y el contenido.

Presta Atención a la Retroalimentación: Usa las explicaciones proporcionadas para entender mejor las respuestas correctas y corregir cualquier malentendido.

Estamos comprometidos a apoyar tu proceso de aprendizaje y esperamos que encuentres útil este examen. ¡Buena suerte y buen aprendizaje!

---

## Examen

<form id="quiz-form"></form>
<button type="button" onclick="checkAnswers()">Submit</button>
<div id="results"></div>

<script>
document.addEventListener('DOMContentLoaded', (event) => {
    fetch('/assets/json/questions.json')
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
                    ${question.image ? `<img class="test-image" src="${question.image}" alt="Question Image"><br>` : ''}
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
    fetch('/assets/json/questions.json')
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