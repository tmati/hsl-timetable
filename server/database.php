<?php

/**
 * Class Database witch handler database.
 */
class Database {

    /**
     * Database constructor.
     * @param $server the server url
     * @param $user the name of user
     * @param $password the password of database
     * @param $database the name of database
     */
    public function __construct($server, $user, $password, $database) {
        $this->host = $server;
        $this->username = $user;
        $this->password = $password;
        $this->database = $database;
        $this->prepareStatements = array
        (
            array("SELECT UserID FROM users WHERE Username = ?", "s"),
            array("SELECT StopID FROM favorites WHERE UserID = ?", "i"),
            array("SELECT StopName FROM stops WHERE StopID = ?", "s"),
            array("INSERT INTO users (Username) VALUES (?)", "s"),
            array("INSERT INTO favorites (UserID, StopID) VALUES (?,?)", "is"),
            array("INSERT INTO stops (StopName, StopID) VALUES (?,?)", "ss")
        );
    }

    public function __toString()
    {
        return (string)$this->host;
    }

    /**
     * Create connection to database
     * @return mysqli New connection
     */
    protected function connect() {
        return new mysqli($this->host, $this->username, $this->password, $this->database);
    }

    /**
     * Inserts data into database.
     * @param $data the data to add.
     * @param $i
     */
    public function insert($data, $i) {
        $db = $this->connect();
        if ($stmt = $db->prepare($this->prepareStatements[$i][0])) {
            #echo $this->prepareStatements[$i][0];
            #echo $this->prepareStatements[$i][1]."";
            # bind parameters
             if($i == 3) {
                 $stmt->bind_param($this->prepareStatements[$i][1] . "", $data->{'name'});
             } else if ($i == 4) {
                 $stmt->bind_param($this->prepareStatements[$i][1] . "", $data->{'userID'}, $data->{'stopID'});
             } else if ($i == 5) {
                 $stmt->bind_param($this->prepareStatements[$i][1] . "", $data->{'stopName'}, $data->{'stopID'});
             }
            if ($stmt->execute() === true) {
                echo "New user created successfully";
            } else {
                echo "Error: " . $stmt . "<br>" . $db->error;
            }
            $stmt->close();
        } else {
            echo "ERROR sql query";
        }
        $db->close();
    }

    /**
     * PreparedStatement query for selecting an users favourited stops from the database.
     * @param $table
     * @param $values
     * @param $condition
     * @param $i the prepared statement types
     * @return bool|mysqli_result
     */
    public function select($table, $values, $condition, $i) {
        $db = $this->connect();
        #create a prepared statement
        $arr = [];
        if ($stmt = $db->prepare($this->prepareStatements[$i][0])) {


             #echo $this->prepareStatements[$i][0];
             #echo $this->prepareStatements[$i][1]."";
            # bind parameters
            $stmt->bind_param($this->prepareStatements[$i][1]."", $condition);

            # execute query
            $stmt->execute();

            # bind result variables
            #$stmt->bind_result($result);
            $result = $stmt->get_result();

            #echo var_export($result->fetch_all());

            # fetch values
            while ($row = $result->fetch_row()) {
                #echo var_export($row);
                $arr[] = $row[0];
            }
#echo "testi";
            $stmt->close();
        }
        $db->close();
        return $arr;
    }

    public function delete($table, $ehto) {
        #echo "Valitse ";
        $db = $this->connect();
        $sql = "DELETE FROM ".$table." WHERE ".$ehto;

        if ($db->query($sql) === TRUE) {
            echo "Deleting success";
        } else {
            echo "Error: SELECT";
            #echo "Error: " . $sql . "<br>" . $db->error;
        }

        $db->close();
    }
}
?>