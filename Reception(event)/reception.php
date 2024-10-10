<?php
$con = mysqli_connect('localhost', 'root', '', 'easeevent');

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get reception details
    $receptionDescription = $_POST['receptionDescription'] ?? '';
    $receptionDate = $_POST['setDate'] ?? ''; // Get date from hidden input
    $receptionLocation = $_POST['setLocation'] ?? ''; // Get location from hidden input
    $receptionLayout = $_POST['setLayout'] ?? ''; // Get layout from hidden input

    // Prepare and bind
    $stmt = $con->prepare("INSERT INTO receptions (date, location, layout, description) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $receptionDate, $receptionLocation, $receptionLayout, $receptionDescription);

    // Execute the statement
    if ($stmt->execute()) {
        // Redirect to the same page to show success message
        header("Location: reception.html?success=1");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$con->close();
?>
