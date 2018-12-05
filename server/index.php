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
        for($i=0; $i <=1; $i++){
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

    function postUser($database, $body) {

        $database->insert($body, 3);
	}

	function postFavoriteStop($database, $body) {
        $database->insert($body, 5);
        $database->insert($body, 4);
    }

    function getStops($database, $userID) {
        $results = $database->select("favourites", "StopID", $userID, 1);
        #echo $results[0];
        #echo sizeof($results);
        if (sizeof($results) > 0) {
            $array = array();
            for ($x = 0; $x < sizeof($results); $x++) {
                #echo $results[$x];
                $stop = $database->select("stops", "Name", $results[$x], 2) ;
                #echo var_export($stop);
                $data = array(
                    "stopID" => $results[$x],
                    "stopName" => $stop[0]
                );
                #echo "id: " . $results[$x]. " name: ".$stop[0]." <br>";
                array_push($array, $data);
            }
            return $array;
        } else {
            return 0;
        }
        #$row = mysqli_fetch_assoc($result);
        #echo implode(",",$result);
        #return $row["StopID"];
    }

    function getUserID($database, $userName) {
        $result = $database->select("users", "UserID", $userName, 0);
        #$row = mysqli_fetch_assoc($result);
        return $result[0];
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
    		postUser($database, $body);
            http_response_code(200); # OK
    	}
        else if ($request_method=="POST" && array_key_exists('userID', $body) && array_key_exists('stopID', $body)) {
            postFavoriteStop($database, $body);
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
            #echo $userID;
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
