<?php
session_start();

// Dummy data for demonstration purposes
$valid_email = "user@example.com";
$valid_password = "password";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if ($email === $valid_email && $password === $valid_password) {
        $_SESSION['loggedin'] = true;
        $_SESSION['email'] = $email;
        // Redirect to the dashboard or another page
        header('Location: dashboard.php');
    } else {
        echo "Invalid email or password. Please try again.";
    }
}
?>
