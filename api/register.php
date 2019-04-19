<?php
    include("../inc/dbconn.php");
    $name = $_GET["user"];
    $pwd = $_GET["pwd"];
    $sql1 = "select name from user where name='$name'";
    // $sql="select * from admin";
    $result = $conn->query($sql1);

    if ($conn->affected_rows){

            $data["code"] = 1;//错误  已存在该手机号
        }else{
            
            $sql2 = "insert into user (name,pwd) values('$name','$pwd')";
            $result2 = $conn->query($sql2);
            if ($conn->affected_rows){
                $data["code"] = 0;
            }else{
                $data["code"] = 2;//未知错误  应该不会出现
            }
        }
    echo json_encode($data);
    
    
?>
