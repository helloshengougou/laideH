<?php
    include("../inc/dbconn.php");

    $style = $_GET["style"];
    if($style==1){
        $user = $_GET["user"];
        $sql = "select * from list,cart where list.listingId=cart.listId and cart.user='$user'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0){
            while($row=mysqli_fetch_assoc($result)){
                $res[]=$row;
            }
            $data['data']=$res;
            $data["code"] = 0;
        }else{
            $data['data']=[];
            $data["code"] = 1;
        }
        echo json_encode($data);
    }elseif($style==2){
        $listId=$_GET["id"];
        $user = $_GET["user"];
        $sql = "delete from cart where listId = '$listId' and user='$user'";
        $result = $conn->query($sql);
        if ($conn->affected_rows==1){
            $data["code"] = 0;
        }else{
            $data["code"] = 1;
        }
    echo json_encode($data);
    }elseif($style==3){
        $listId=$_GET["id"];
        $user = $_GET["user"];
        $n=$_GET["n"];
        $sql="update cart set listNum='$n' where listId='$listId' and user='$user'";
        $result = $conn->query($sql);
        if ($conn->affected_rows==1){
            $data["code"] = 0;
        }else{
            $data["code"] = 1;
        }
    echo json_encode($data);
    }elseif($style==4){
        $user = $_GET["user"];
        $sql="delete from car where user='$user'";
        $result = $conn->query($sql);
        if ($conn->affected_rows==1){
            $data["code"] = 0;
        }else{
            $data["code"] = 1;
        }
    echo json_encode($data);
    }
    
?>