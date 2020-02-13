<?php
    header("Access-Control-Allow-Origin: *");
    function pullToSeeList($id){
        include('connect.php');
        $myQuery = "SELECT * FROM to_see WHERE user_id = {$id}";
        $result = mysqli_query($link, $myQuery);
        $rows = array();
        while($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
        mysqli_close($link);
    }

    function pullToSeeList2($id){
        include('connect.php');
        $myQuery = "SELECT * FROM seen_movies WHERE user_id = {$id}";
        $result = mysqli_query($link, $myQuery);
        $rows = array();
        while($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
        mysqli_close($link);
    }

    if(isset($_GET['id'])){
		$id = $_GET['id'];
		pullToSeeList($id);
    }
    if(isset($_GET['id2'])){
		$id = $_GET['id2'];
		pullToSeeList2($id);
	}
?>