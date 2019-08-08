<?php
include('cors.php');
include('database_connection.php');

$form_data = json_decode(file_get_contents('php://input'), true);

$error = '';
$message= '';
$validation_error = '';
$firstName = '';
$lastName = '';

if(empty($form_data['firstName'])){
	$error[] = 'First Name is required';
}else{
	$firstName = $form_data['firstName'];
}

if(empty($form_data['lastName'])){
	$error[] = 'Last Name is required';
}else{
	$lastName = $form_data['lastName'];
}

if(empty($error)){
	if($form_data['action'] == 'Insert'){
		
		//Method 1
		/*$statement = $connect->prepare("INSERT INTO profile(firstName,lastName) VALUES (:firstName,:lastName)");
		$statement->bindParam(":firstName", $firstName, PDO::PARAM_STR);
		$statement->bindParam(":lastName", $lastName, PDO::PARAM_STR);
		if($statement->execute()){
			$message = "Record inserted successfully";
		}*/
		
		
		//Method 2
		$data = array(
			':firstName' => $firstName,
			':lastName' => $lastName
		);
		$query = "INSERT INTO profile(firstName,lastName) VALUES (:firstName,:lastName)";
		$statement = $connect->prepare($query);
		$statement->bindParam(":firstName", $firstName, PDO::PARAM_STR);
		$statement->bindParam(":lastName", $lastName, PDO::PARAM_STR);
		if($statement->execute()){
			$message = "Record inserted successfully";
		}
	}
}else{
	$validation_error = implode(",",$error);
}

$output = array(
	'error' => $validation_error,
	'message' => $message
);

echo json_encode($output);
?>