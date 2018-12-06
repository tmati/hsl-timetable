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
        for($i=0; $i <=2; $i++){
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
        return $database->insert($body, 3);
	}

	function postFavoriteStop($database, $body) {
        $database->insert($body, 5);
        $database->insert($body, 4);
    }

    function getStops($database, $userID) {

        $results = $database->select("favourites", "StopID", $userID, 1);
        #echo $results[0];
        #echo sizeof($results);
        $array = array();
        if (sizeof($results) > 0) {
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
                #$array[] = $data;
                #echo json_encode($data);
                #echo implode(":", $data);
            }
            #implode(" ", $array);
            #echo json_encode($array);
            #echo sizeof($array);
            return $array;
        } else {
            return $array;
        }
        #$row = mysqli_fetch_assoc($result);
        #echo implode(",",$result);
        #return $row["StopID"];
    }

    function getUserID($database, $userName) {
        return $database->select("users", "UserID", $userName, 0);
        #$row = mysqli_fetch_assoc($result);
    }

    function deleteFavorite($database, $stopID) {
        return $database->delete($stopID, 6);
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
	if ($resource[0]=="rtmapi") {

    	if ($request_method=="POST" && $resource[1]=="user") {
    		$message = postUser($database, $body);
            if (empty($message)) {
                # Set response code - 200 OK
                http_response_code(200);
                echo json_encode(
                    array("message" => "Adding ".$body->name." success")
                );
            } else {
                # Set response code - 409 Conflict
                http_response_code(409);
                echo json_encode(
                    array("message" => "ERROR: ".$message)
                );
            }
    	}
        else if ($request_method=="POST" && $resource[1]=="favoritestop") {
            $message = postFavoriteStop($database, $body);
            if (empty($message)) {
                # Set response code - 200 OK
                http_response_code(200);
                echo json_encode(
                    array("message" => "Adding ".$body->stopName." success")
                );
            } else {
                # Set response code - 409 Conflict
                http_response_code(409);
                echo json_encode(
                    array("message" => "ERROR:".$message)
                );
            }
        }
        else if ($request_method=="GET" && $resource[1]=="stops") {
            $stops = getStops($database, $resource[2]);
            #echo json_encode($stops);
            #echo sizeof($stops);
           # echo json_encode($stops[1]);
           # echo print_f ($stops);
            if (empty($stops)) {
                # Set response code - 404 Not found
                http_response_code(404);
                echo json_encode(
                    array("message" => "Stops for user " . $resource[2] . " not found.")
                );
            } else if(array_key_exists("message", $stops)) {
                # Set response code - 500 Internal Server Error
                http_response_code(500);
                echo json_encode(
                    array("message" => "ERROR: " . $message)
                );
            } else {
                #echo "jbkn";
                #$data->"favorites"=$stops;
                $data = array(
                    "favorites" => $stops
                );
                #echo $data['favorites'][1];
                #echo array_values($data);
                #echo implode(" ", $data);
                #echo json_encode($stops[1]);
                #echo json_encode($data['favorites']);
                http_response_code(200); # OK
                echo json_encode($data);
            }
        }
        else if ($request_method=="GET" && $resource[1]=="users") {
            $userID = getUserID($database, $resource[2]);
            #echo $userID;
            if (empty($userID)) {
                # Set response code - 404 Not found
                http_response_code(404);
                echo json_encode(
                    array("message" => "User ".$resource[2]." not found.")
                );
            } else if(array_key_exists("message", $userID)) {
                # Set response code - 500 Internal Server Error
                http_response_code(500);
                echo json_encode(
                    array("message" => "ERROR: ".$message)
                );
            } else {
                $data = array(
                    "userID" => $userID[0],
                    "userName" => $resource[2]
                );
                # Set response code - 200 OK
                http_response_code(200); # OK
                echo json_encode($data);
            }
        }
        else if($request_method=="DELETE" && $resource[1]=="favorite") {
            $message = deleteFavorite($database, $resource[2]);
            if (empty($message)) {
                # Set response code - 200 OK
                http_response_code(200);
                echo json_encode(
                    array("message" => "Deleting ".$resource[2]." success")
                );
            } else {
                # Set response code - 404 Not found
                http_response_code(404);
                echo json_encode(
                    array("message" => "ERROR: ".$message)
                );
            }
        } else {
            # Set response code - 405 Method not allowed
            http_response_code(405);
            echo json_encode(
                array("message" => $resource[1]." is wrong method")
            );
        }
	}
	else {
        # Set response code - 405 Method not allowed
		http_response_code(405);
        echo json_encode(
            array("message" => "Wrong API")
        );
	}
?>
