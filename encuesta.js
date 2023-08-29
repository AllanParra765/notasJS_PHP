 // Pega aquí el código JavaScript que te proporcioné anteriormente
   // Definir preguntas y respuestas  
   const questions = [
    {
      question: "1. Si hoy fueran la elecciones a la gubernatura de Guanajuato, ¿Usted por quien votaría?",
      options: [
        { image: "img/p1_a.png" , value: "P1_A" },
        { image: "img/p1_b.png", value: "P1_B" }
      ]
    },
    {
      question: "2. Si hoy fueran la elecciones a la gubernatura de Guanajuato, ¿Usted por quien votaría?",
      options: [
        { image: "img/EncuestaP2_A.png", value: "P2_A" },
        { image: "img/EncuestaP2_B.png", value: "P2_B" }
      ]
    },{
      question: "3. Quién cree que puede gobernar mejor el estado de Guanajuato, ¿Un presidente municipal o un funcionario del estado?",
      options: [
        { image: "img/EncuestaP3_A.png", value: "P3_A" },
        { image: "img/EncuestaP3_B.png", value: "P3_B" }
      ]
    },{
      question: "4. Quién cree que puede gobernar mejor el estado de Guanajuato, ¿Alguien que venga a hacer las cosas de manera diferente o alguien que de continuidad?",
      options: [
        { image: "img/EncuestaP4_A.png", value: "P4_A" },
        { image: "img/EncuestaP4_B.png", value: "P4_B" }
      ]
    },
    // Agrega las siguientes preguntas de la misma manera
    // ...
  ];
  
  let currentQuestion = 0;
  const answers = [];
  
  // Función para mostrar la pregunta actual
  function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const currentQuestionData = questions[currentQuestion];
  
    /*
    // Mostrar la pregunta
    const questionElement = document.createElement("h2");
    questionElement.textContent = currentQuestionData.question;
    questionContainer.appendChild(questionElement);
*/

// Mostrar la pregunta
const questionElement = document.createElement("h2");
questionElement.innerHTML = currentQuestionData.question.replace(
  /¿(.*?)\?/g,
  '<span class="highlight">¿$1?</span>'
);
questionContainer.appendChild(questionElement);





  
    // Mostrar las opciones de imagen
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");
  
    currentQuestionData.options.forEach((option, index) => {
      const optionElement = document.createElement("img");
      optionElement.src = option.image;
      optionElement.alt = option.value;
      optionElement.classList.add("option");
  
      // Agregar evento de clic a cada opción
      optionElement.addEventListener("click", () => {
        selectOption(index);
      });
  
      optionsContainer.appendChild(optionElement);
    });
  
    questionContainer.appendChild(optionsContainer);
  
    // Desplazarse hacia abajo para mostrar la siguiente pregunta
    //questionContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    questionContainer.scrollIntoView({
    behavior: 'auto', // 'auto' or 'smooth'
    block: 'end',    // 'start', 'center', 'end' or 'nearest'
    inline: 'end'    // 'start', 'center', 'end' or 'nearest'
  });
  
  }
  
  // Función para seleccionar una opción
  function selectOption(optionIndex) {
    // Guardar la respuesta seleccionada
    const currentQuestionData = questions[currentQuestion];
    answers.push(currentQuestionData.options[optionIndex].value);
  
    // Pasar a la siguiente pregunta o mostrar mensaje de agradecimiento
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
    } else {
      showThankYouMessage();
    }
  }
  
  // Función para mostrar mensaje de agradecimiento
  function showThankYouMessage() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "<h2>¡Gracias por completar la encuesta!</h2>";
  
    // Obtener el resultado de las respuestas
    const result = answers.join("\n");
    // Enviar el resultado por correo electrónico
    enviarCorreo(result);
  
    // Recargar la página después de 2 segundos
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
  
  // Función para enviar el resultado por correo electrónico utilizando AJAX
  function enviarCorreo(resultado) {
    //alert("Entre  "+ resultado);
    $.ajax({
      url: "resultados.php", // Reemplaza con el nombre de tu archivo PHP
      method: "POST",
      data: { resultado: resultado },
      success: function(response) {
        console.log("Correo electrónico enviado con éxito. desde index", response);
      },
      error: function(error) {
        console.error("Error al enviar el correo electrónico.", error);
      }
    });
  }
  
  
  
  
  // Iniciar la encuesta
  showQuestion();
  