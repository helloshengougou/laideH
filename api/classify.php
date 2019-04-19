<?php
    include('../inc/dbconn.php');
    $num = $_GET['num'];
    if($num ==1){
        $cont = $_GET['cont'];

        $sql = "select * from classify where floor='$cont'";

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
    }elseif($num == 2){
        $fl = $_GET['fl'];

        $sql = "select * from category where dataId='$fl'";

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
    }
    

?>