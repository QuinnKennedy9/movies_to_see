<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');


$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (empty($_POST['id']) && empty($_POST['title'])) die();

function addMovie($id,$title){
    include('connect.php');
    $myQuery = "INSERT INTO to_see (movie_title, user_id) VALUES ('${title}','${id}')";
    echo $title;
    $result = mysqli_query($link, $myQuery);
    mysqli_close($link);
}

if ($_POST)
	{

	// set response code - 200 OK

	http_response_code(200);


	// data
    $id= $_POST['id'];
	$title = $_POST['title'];
	addMovie($id,$title);


	// echo json_encode( $_POST );

	echo json_encode(array(
		"sent" => true
	));
	}
else
	{

	// tell the user about error

	echo json_encode(["sent" => false, "message" => "Something went wrong"]);
	}

?>






