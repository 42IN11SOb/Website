<?php
// Check for empty fields
if(empty($_POST['email'])  	||
   empty($_POST['pass']) 		||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$password = $_POST['pass'];
$email_address = $_POST['email'];
	
// Create the login request to api
$client = new http\Client;
$request = new http\Client\Request;

$body = new http\Message\Body;
$body->addForm(array(
  'email' => $email_address,
  'password' => $password
), NULL);

$request->setRequestUrl('api/login');
$request->setRequestMethod('POST');
$request->setBody($body);


$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();
return true;
?>