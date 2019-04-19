<?php
    include("../inc/dbconn.php");

    $ID = $_GET["id"];
    $style = $_GET["style"];
    $user = $_GET["user"];
    $consignee = $_GET["consignee"];
    $addrNum = $_GET["num"];
    $addr1 = $_GET["addr1"];
    $addr2 = $_GET["addr2"];
    $postCode = $_GET["postCode"];
    if($style==0){
        $sql = "update addr set defaultAddr='1' where defaultAddr='0'";
        $result = $conn->query($sql);
        $sql2="update addr set defaultAddr='0' where Id='$ID'";
        $result2=$conn->query($sql2);
    }
    $sql1="update addr set consignee='$consignee',addrNum='$addrNum',addr1='$addr1',addr2='$addr2',postCode='$postCode' where Id='$ID'";
    $result1=$conn->query($sql1);
    if ($conn->affected_rows!=-1){
            $data["code"] = 0;
        }else{
            $data["code"] = 1;
        }
    echo json_encode($data);
?>