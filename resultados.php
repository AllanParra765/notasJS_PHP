<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $resultado = $_POST["resultado"];

  // Configurar el destinatario y asunto del correo electrónico
  $destinatario = "allanpe@hotmarketing.mx"; // Reemplaza con la dirección de correo electrónico del destinatario
  $asunto = "Resultados de la encuesta";

  // Configurar el contenido del correo electrónico
  $mensaje = $resultado;

  // Enviar el correo electrónico
  $enviado = mail($destinatario, $asunto, $mensaje);

  if ($enviado) {
    echo "Correo electrónico enviado con éxito.";
  } else {
    echo "Error al enviar el correo electrónico.";
  }
}
?>
