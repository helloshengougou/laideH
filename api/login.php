<?php
    include("../inc/dbconn.php");
    $name = $_GET["user"];
    $pwd = $_GET["pwd"];
    $sql1 = "select name,pwd from user where name='$name' and pwd='$pwd'";
    // $sql="select * from admin";
    $result = $conn->query($sql1);
        if ($conn->affected_rows){
            $data["code"] = 0;
        }else{
            $data["code"] = 1;//未知错误  应该不会出现
        }
    echo json_encode($data);
    
    
?>
