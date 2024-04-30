<?php
// Retrieve form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

// Validate input (example)
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo "Please fill in all the fields.";
    exit; // Stop further execution
}

// Sanitize input (example)
$name = htmlspecialchars($name);
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($subject);
$message = htmlspecialchars($message);

// Email recipient
$to = 'lavthaiba@gmail.com';

// Email headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";

// Email content
$body = "Name: $name<br>";
$body .= "Email: $email<br>";
$body .= "Subject: $subject<br>";
$body .= "Message: $message<br>";

// Send email
$mail_sent = mail($to, $subject, $body, $headers);

// Check if the email was sent successfully
if ($mail_sent) {
    echo "Email sent successfully.";
} else {
    echo "Failed to send email. Please try again later.";
}
?>
