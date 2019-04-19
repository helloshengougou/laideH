<?php
    include("../inc/dbconn.php");

    $ID=$_GET["id"];

    $sql = "delete from addr where Id = '$ID'";
    $result = $conn->query($sql);
    if ($conn->affected_rows==1){
        $data["code"] = 0;
    }else{
        $data["code"] = 1;
    }
    echo json_encode($data);
    
?>