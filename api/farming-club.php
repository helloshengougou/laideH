<?php
    include('../inc/dbconn.php');
    
    $flag = $_GET['flag'];

    if($flag == 1) {
        $key = $_GET['key'];

        $sql = "select * from farming where type = '$key'";
    
        $result = $conn -> query($sql);
    
        if($result -> num_rows > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $list[] = $row;
            }
            $data['list'] = $list;
            $data['code'] = 0;
        }else {
            $data['code'] = 1;
        }
        
        echo json_encode($data);
    }else if($flag == 2) {
        $key = $_GET['key'];

        $sql = "select * from farming where type = '$key'";
    
        $result = $conn -> query($sql);
    
        if($result -> num_rows > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $list[] = $row;
            }
            $data['list'] = $list;
            $data['code'] = 0;
        }else {
            $data['code'] = 1;
        }
        
        echo json_encode($data);
    }
   
    
    