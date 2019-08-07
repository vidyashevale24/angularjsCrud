<?php
//Include cnnection file

 if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: text/plain');
        die();
    }

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include('database_connection.php');
$query = "SELECT * FROM profile ORDER BY id";

$statement = $connect->prepare($query);
if($statement->execute()){
	while($row = $statement->fetch(PDO::FETCH_ASSOC)){
		$data[] = $row;
	}
	echo json_encode($data);
}
?>