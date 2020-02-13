<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');


$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (empty($_POST['name']) && empty($_POST['password'])) die();

function registerUser($name,$password){
	include('connect.php');
		$checkString = "SELECT * FROM users WHERE user_name = '{$name}'";
		$checkQuery = mysqli_query($link, $checkString);
		$rows = array();
		while($row = mysqli_fetch_assoc($checkQuery)) {
            $rows[] = $row;
		}
		$size =  sizeof($rows);
		if($size > 0){
			echo 'That name is already in use.  Please use an alternative name.';
		}else if($size == 0){
			$encrypted = password_hash($password, PASSWORD_DEFAULT);
			$userstring = "INSERT INTO users (user_name, user_password) VALUES ('${name}', '${encrypted}')";
			echo $userstring;
    		$userquery = mysqli_query($link, $userstring);
    		mysqli_close($link);
		}
}

if ($_POST)
	{

	// set response code - 200 OK

	http_response_code(200);


	// data

	$name = $_POST['name'];
	$password = $_POST['password'];
	registerUser($name,$password);


	// echo json_encode( $_POST );

	echo json_encode([
		"sent" => true,
		"message" => "It's like working but not"
	]);
	}
else
	{

	// tell the user about error

	echo json_encode(["sent" => false, "message" => "Something went wrong"]);
	}

?>



