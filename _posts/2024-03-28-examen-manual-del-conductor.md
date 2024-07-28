---
layout: post
title:  "Examen Manual del Conductor"
author: adrian
categories: [ manual del conductor, examen teorico ]
image: assets/images/blogs/creative-writing.png
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
            const form = document.getElementById('quiz-form');
            data.forEach((question, index) => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <p>${question.question}</p>
                    ${question.image ? `<img src="${question.image}" alt="Question Image"><br>` : ''}
                    ${question.options.map((option, i) => `
                        <label><input type="radio" name="q${index + 1}" value="${option}"> ${option}</label><br>
                    `).join('')}
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
            const totalQuestions = data.length;

            data.forEach((question, index) => {
                const answer = document.querySelector(`input[name="q${index + 1}"]:checked`);
                if (answer && answer.value === question.correct) {
                    score++;
                }
            });

            const percentage = (score / totalQuestions) * 100;
            document.getElementById('results').innerText = `You scored ${score} out of ${totalQuestions} (${percentage}%)`;
        });
}
</script>