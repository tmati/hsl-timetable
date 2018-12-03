<?php

/**
 * Class Database constructor
 */
class Database {
    public function __construct($server, $user, $password, $database) {
        $this->host = $server;
        $this->username = $user;
        $this->password = $password;
        $this->database = $database;
    }

    public function __toString()
    {
        return $this->host;
    }

    /**
     * @return mysqli New connection
     */
    protected function connect() {
        return new mysqli($this->host, $this->username, $this->password, $this->database);
    }

    /**
     * Inserts a name feed into the database using PreparedStatement.
     * @param $table the tabel to use
     * @param $values the values to add
     * @param $data the data to add.
     */
    public function insert($table, $values, $data) {
        echo "lisays";
        //TOIMII POSTMANISSA
        //Inserts name in form 'name' into SQL
        $insertData = $data;
        $db = $this->connect();
        $stmt = $db->prepare("INSERT INTO ".$table." (".$values.") VALUES (?)");
        //$sql = "INSERT INTO ".$table." (".$values.") VALUES ($data)";
        $stmt->bind_param("s", $insertData);

        $stmt->execute();

        //if ($db->query($stmt) === TRUE) {
        if($stmt->execute() === true) {
            echo "New user created successfully";
        } else {
            echo "Error: " . $stmt . "<br>" . $db->error;
        }
        $stmt->close();
        $db->close();
    }

    /**
     * Another form of required PreparedStatement insert queries.
     * @param $table
     * @param $values
     * @param $stopName
     * @param $stopID
     */
    public function StopsInsert($table, $values, $stopName, $stopID) {
        //TOIMII POSTMANISSA
        echo "lisays";

        //Inserts stopname and stopID into table
        $insertStopname = $stopName;
        $insertStopID = $stopID;
        $db = $this->connect();
        $stmt = $db->prepare("INSERT INTO ".$table." (".$values.") VALUES (?,?)");
        //$sql = "INSERT INTO ".$table." (".$values.") VALUES ($data)";
        $stmt->bind_param("si", $insertStopname,$insertStopID);

        if ($stmt->execute() === TRUE) {
            echo "Stop inserted successfully";
        } else {
            //echo "Error: " . $stmt . "<br>" . $db->error;
            echo $stmt->error;
        }
        $stmt->close();
        $db->close();
    }

    /**
     * PreparedStatement insert for userID and StopID
     * @param $table
     * @param $values
     * @param $userID
     * @param $stopID
     */
    public function multiParamInsert($table, $values, $userID, $stopID) {
        echo "lisays";
        //TOIMII POSTMANISSA
        //Inserts name in form 'name' into SQL
        $insertUserID = $userID;
        $insertStopID = $stopID;
        $db = $this->connect();
        $stmt = $db->prepare("INSERT INTO ".$table." (".$values.") VALUES (?,?)");
        //$sql = "INSERT INTO ".$table." (".$values.") VALUES ($data)";
        $stmt->bind_param("ii", $insertUserID,$insertStopID);

        if ($stmt->execute() === TRUE) {
            echo "Favourite added successfully";
        } else {
            //echo "Error: " . $stmt . "<br>" . $db->error;
            echo $stmt->error;
        }
        $stmt->close();
        $db->close();
    }

    /**
     * PreparedStatement query for selecting an users favourited stops from the database.
     * @param $table
     * @param $values
     * @param $ehto
     * @return bool|mysqli_result
     */
    public function selectStops($table, $values, $ehto) {
        #echo "Valitse ";
        $selectEhto = $ehto;
        $db = $this->connect();
        $stmt = $db->prepare("SELECT ".$values." FROM ".$table." WHERE UserID=(?)");
        //$sql = "SELECT ".$values." FROM ".$table." WHERE ".$ehto;
        $stmt->bind_param("i", $selectEhto);

        $stmt->execute();
        $result = $stmt->get_result();
        //$result = $db->query($sql);
        #echo $sql;

        if ($result->num_rows > 0) {
        //if ($result->num_rows() > 0) {
            echo "onnistui";
            var_dump($result);
            return $result;
        } else {
            echo "pieleen";
            #echo "Error: " . $sql . "<br>" . $db->error;
            echo $stmt->error;
        }
        $stmt->close;
        $db->close();
    }

    /**
     * PreparedStatement query to select names for the users' favorite stops.
     * @param $table
     * @param $values
     * @param $ehto
     * @return bool|mysqli_result
     */
    public function selectStopNames($table, $values, $ehto) {
        //TOIMII MELKEIN: KATSO POSTMAN
        #echo "Valitse ";
        $selectEhto = $ehto;
        $db = $this->connect();
        $stmt = $db->prepare("SELECT ".$values." FROM ".$table." WHERE (?)");
        //$sql = "SELECT ".$values." FROM ".$table." WHERE ".$ehto;
        $stmt->bind_param("s", $selectEhto);

        $stmt->execute();
        $result = $stmt->get_result();
        //$result = $db->query($sql);
        #echo $sql;

        if ($result->num_rows > 0) {
            //if ($result->num_rows() > 0) {
            echo "onnistui";
            var_dump($result);
            return $result;
        } else {
            echo "pieleen meni";
            #echo "Error: " . $sql . "<br>" . $db->error;
            echo $stmt->error;
        }
        //$stmt->close;
        $db->close();
    }

}
?>