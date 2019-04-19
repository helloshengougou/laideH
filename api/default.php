<?php
    include('../inc/dbconn.php');
    $fl = $_GET['fl'];
    $sql = "select * from classify where dataId='$fl'";
    $result = $conn->query($sql);
    if ($result->num_rows>0) {
        while ($row =mysqli_fetch_assoc($result)) {
           $list[]=$row;
        }
        $data['list']=$list;
        $data['code']=0;
    }else{
        $data['code']=1;
    }
    echo json_encode($data);

?>