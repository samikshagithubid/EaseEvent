<?php
include 'connection.php';

// Check if the connection was successful
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Initialize statement variable
$stmt = null;

if (isset($_POST['submit'])) {
    // Check if the required fields are set
    if (isset($_POST['email']) && isset($_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $date_time = date("Y-m-d H:i:s");

        // Prepare the user query
        $stmt = $con->prepare("SELECT password, role FROM users WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        // Check if user exists
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            // Verify password
            if (password_verify($password, $row['password'])) {
                // Record login details
                $que = "INSERT INTO login (user, date_time) VALUES (?, ?)";
                $insert_stmt = $con->prepare($que);
                $insert_stmt->bind_param("ss", $email, $date_time);
                $insert_stmt->execute();

                // Success message and redirect based on role
                echo "<script>
                        alert('Login successful! Redirecting...');
                        setTimeout(function() {
                            window.location.href = 'index.html';
                        }, 2000);
                      </script>";
                exit();
            } else {
                echo "<script>
                        alert('Invalid username or password');
                        setTimeout(function() {
                            window.location.href = 'login.html';
                        }, 5000);
                      </script>";
            }
        } else {
            echo "<script>
                    alert('Invalid username or password');
                    setTimeout(function() {
                        window.location.href = 'login.html';
                    }, 5000);
                  </script>";
        }
    } else {
        echo "<script>
                alert('Email and password are required');
                setTimeout(function() {
                    window.location.href = 'login.html';
                }, 5000);
              </script>";
    }
}

if ($stmt) {
    $stmt->close();
}
$con->close();
?>
