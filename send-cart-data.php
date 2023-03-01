<?php
// Retrieve the data from the AJAX request
$data = json_decode(file_get_contents('php://input'), true);

// Connect to the database
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Insert the data into the database
$sql = "INSERT INTO cart_data (data) VALUES ('" . $data['data'] . "')";

if ($conn->query($sql) === TRUE) {
  echo "Data saved successfully!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>
