<?php
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

    // Create connection
    protected function connect() {
        return new mysqli($this->host, $this->username, $this->password, $this->database);
    }

    public function insert($table, $values, $data) {
        echo "lisays";
        $db = $this->connect();
        $sql = "INSERT INTO ".$table." (".$values.") VALUES ($data)";

        if ($db->query($sql) === TRUE) {
            echo "New user created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $db->error;
        }

        $db->close();
    }

    public function select($table, $values, $ehto) {
        #echo "Valitse ";
        $db = $this->connect();
        $sql = "SELECT ".$values." FROM ".$table." WHERE ".$ehto;
        #echo $sql;
        $result = $db->query($sql);

        if ($result->num_rows > 0) {
            return $result;
        } else {
            echo "Error: SELECT";
            #echo "Error: " . $sql . "<br>" . $db->error;
        }

        $db->close();
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