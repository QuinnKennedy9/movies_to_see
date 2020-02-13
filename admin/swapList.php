<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');


$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (empty($_POST['id']) && empty($_POST['title'])) die();

function swapList($id,$title,$status){
    include('connect.php');
    $myQuery = "INSERT INTO seen_movies (movie_title, user_id, seen_status) VALUES ('${title}','${id}','$status')";
    $result = mysqli_query($link, $myQuery);
	$secondQuery = "DELETE FROM to_see WHERE user_id = '{$id}' AND movie_title = '{$title}'";
	$result2 = mysqli_query($link, $secondQuery);
	mysqli_close($link);
}

if ($_POST)
	{

	// set response code - 200 OK

	http_response_code(200);


	// data
    $id= $_POST['id'];
	$title = $_POST['title'];
	$status = $_POST['status'];
	swapList($id,$title,$status);


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






