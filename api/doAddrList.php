<?php
include("../inc/dbconn.php");
$user = $_GET["user"];
    $sql = "select * from addr where user='$user'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0){
        while($row=mysqli_fetch_assoc($result)){
            $res[]=$row;
        }
        $data['data']=$res;
        $data["code"] = 0;
    }else{
        $data["code"] = 1;
    }
    echo json_encode($data);
?>