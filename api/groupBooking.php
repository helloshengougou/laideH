<?php
    include("../inc/dbconn.php");
    $class = $_GET["class"];
    $sql1 = "select * from commodity where class='$class'";
    $result = $conn->query($sql1);
    if($result->num_rows > 0){
        while($row=$result->fetch_assoc()){
            $data[]=$row;
            // print_r($data);
        }
    }
    echo json_encode($data);
?>
