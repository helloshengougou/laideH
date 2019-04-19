<?php
    include("../inc/dbconn.php");
    $listId=$_GET['listId'];
    $user = $_GET["user"];
    $listNum = $_GET["listNum"];
    // $listSize = $_GET["listSize"];
    // $listColor = $_GET["listColor"];
    $sql = " insert into cart (listId,user,listNum) values ('$listId','$user','$listNum')";
    $result = $conn->query($sql);
    if ($conn->affected_rows){
        $data["code"] = 0;
    }else{
        $data["code"] = 1;//未知错误  应该不会出现
    }
echo json_encode($data);

?>