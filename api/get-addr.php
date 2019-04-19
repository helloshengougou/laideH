<?php
    include("../inc/dbconn.php");

    $ID = $_GET["id"];
    
    $sql = "select * from addr where id='$ID'";
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