<?php

include 'database.php';

# URI parser helper functions
# ---------------------------

    function getResource() {
        # returns numerically indexed array of URI parts
        $resource_string = $_SERVER['REQUEST_URI'];
        //echo $resource_string;
        if (strstr($resource_string, '?')) {
            $resource_string = substr($resource_string, 0, strpos($resource_string, '?'));
            #echo $resource_string;
        }
        $resource = array();
        $resource = explode('/', $resource_string);
        for($i=0; $i <=3; $i++){
        	array_shift($resource);
		}
        //array_shift($resource);
		#print_r($resource);
        return $resource;
    }

    function getParameters() {
        # returns an associative array containing the parameters
        $resource = $_SERVER['REQUEST_URI'];
        $param_string = "";
        $param_array = array();
        if (strstr($resource, '?')) {
            # URI has parameters
            $param_string = substr($resource, strpos($resource, '?')+1);
            $parameters = explode('&', $param_string);
            foreach ($parameters as $single_parameter) {
                $param_name = substr($single_parameter, 0, strpos($single_parameter, '='));
                $param_value = substr($single_parameter, strpos($single_parameter, '=')+1);
                $param_array[$param_name] = $param_value;
            }
        }
        return $param_array;
    }

    function getMethod() {
        # returns a string containing the HTTP method
        $method = $_SERVER['REQUEST_METHOD'];
        return $method;
    }
 
# Handlers
# ------------------------------

    function postUser($database, $name) {
        $database->insert("users", "Username", "'".$name."'");
	}

	function postFavoriteStop($database, $userID, $stopID, $stopName) {
        $database->insert("stops", "Name, StopID", "'".$stopName."', '".$stopID."'");
        $result = $database->insert("favorites", "UserID, StopID", "'".$userID."', '".$stopID."'");
    }

    function getStops($database, $userID) {
        $result = $database->select("favorites", "StopID", "UserID=".'"'.$userID.'"');
        $array = array();
        $data = null;
        if (mysqli_num_rows($result) > 0) {
            // output data of each row
            while($row = mysqli_fetch_assoc($result)) {
                $name = $database->select("stops", "Name", "StopID=".'"'.$row["StopID"].'"');
                $nameRow = mysqli_fetch_assoc($name);
                $data = array(
                    "stopID" => $row["StopID"],
                    "stopName" => $nameRow["Name"]
                );
                #echo "id: " . $row["StopID"]. " name: ".$nameRow["Name"]." <br>";
                array_push($array, $data);
            }
            return $array;
        } else {
            echo 0;
        }
        #$row = mysqli_fetch_assoc($result);
        #echo implode(",",$result);
        #return $row["StopID"];
    }

    function getUserID($database, $userName) {
        $result = $database->select("users", "UserID", "Username=".'"'.$userName.'"');
        $row = mysqli_fetch_assoc($result);
        return $row["UserID"];
    }


# Main
# ----

    $body = json_decode(file_get_contents("php://input"));
    $json = json_encode($body);
    #echo $json.name;
    #echo array_key_exists('name', $body);
    #echo is_null($body->{'name'} );
	$resource = getResource();
	#echo implode("|",$resource);
	#echo $resource[0];
    $request_method = getMethod();
    $parameters = getParameters();
    #echo key($parameters);
    #next($parameters)
    #echo key($parameters);
	#echo implode("|",$parameters);

$database = new Database("localhost","hsl", "hsl", "hsl");

    # Redirect to appropriate handlers.
	if ($resource[0]=="index.php") {

    	if ($request_method=="POST" && array_key_exists('name', $body)) {
    		postUser($database, $body->{'name'});
            http_response_code(200); # OK
    	}
        else if ($request_method=="POST" && array_key_exists('userID', $body) && array_key_exists('stopID', $body)) {
            postFavoriteStop($database, $body->{'userID'}, $body->{'stopID'}, $body->{'stopName'});
        }
        else if ($request_method=="GET" && key($parameters) == "ID") {
            #getStops($database, $parameters["userID"]);
            #echo $parameters["userID"];
            $stops = getStops($database, $parameters["ID"]);
            if ($stops != 0) {
                $data = array(
                    "favorites" => $stops
                );
                http_response_code(200); # OK
                echo json_encode($data);
            }
        }
        else if ($request_method=="GET" && key($parameters) == "user") {
            $userID = getUserID($database, $parameters["user"]);
            if ($userID > 0) {
                $data = array(
                    "userID" => $userID,
                    "userName" => $parameters["user"]
                );
                http_response_code(200); # OK
                echo json_encode($data);
            }
        } else {
            http_response_code(405); # Method not allowed
            echo "Ei ole komento";
        }

	}
	else {
		http_response_code(405); # Method not allowed
	}
?>
