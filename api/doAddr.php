<?php
    include("../inc/dbconn.php");

    $style = $_GET["style"];
    if($style==1){
        $user = $_GET["user"];
        $consignee = $_GET["consignee"];
        $addrNum = $_GET["num"];
        $addr1 = $_GET["addr1"];
        $addr2 = $_GET["addr2"];
        $postCode = $_GET["postCode"];
        // $sql = "insert into addr (user,consignee) values ('$user','$consignee')";
        $sql = "insert into addr (user,consignee,addrNum,addr1,addr2,postCode,defaultAddr) values ('$user','$consignee','$addrNum','$addr1','$addr2','$postCode','$style')";
        $result = $conn->query($sql);
        if ($conn->affected_rows==1){
            // while($row=mysqli_fetch_assoc($result)){
            //     $res[]=$row;
            // }
            $data['data']=$style;
            $data["code"] = 0;
        }else{
            $data["code"] = 1;
        }
        echo json_encode($data);
    }elseif($style==0){
        $user = $_GET["user"];
        $consignee = $_GET["consignee"];
        $addrNum = $_GET["num"];
        $addr1 = $_GET["addr1"];
        $addr2 = $_GET["addr2"];
        $postCode = $_GET["postCode"];
        $sql = "insert into addr (user,consignee,addrNum,addr1,addr2,postCode,defaultAddr) values ('$user','$consignee','$addrNum','$addr1','$addr2','$postCode','$style')";
        $sql1 = "update addr set defaultAddr='1' where defaultAddr='0'";
        $result = $conn->query($sql1);
        $result1 = $conn->query($sql);
        if ($conn->affected_rows==1){
            $data["code"] = 0;
        }else{
            $data["code"] = 1;
        }
    echo json_encode($data);
    }
?>