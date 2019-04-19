<?php
    include("../inc/dbconn.php");

    $user = $_GET["user"];
    $ID = $_GET["id"];
    
    // $sql = "insert into addr (user,consignee,addrNum,addr1,addr2,postCode,defaultAddr) values ('$user','$consignee','$addrNum','$addr1','$addr2','$postCode','$style')";
    $sql1 = "update addr set defaultAddr='1' where defaultAddr='0'";
    $sql2 = "update addr set defaultAddr='0' where id='$ID'";
    $result1 = $conn->query($sql1);
    $result2 = $conn->query($sql2);
    if ($conn->affected_rows==1){
        $data["code"] = 0;
    }else{
        $data["code"] = 1;
    }
    echo json_encode($data);
?>