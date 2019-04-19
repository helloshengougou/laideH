<?php
    include('../inc/dbconn.php');

    $id = $_GET['id'];

    $start = ($id - 1) * 3;

    $sql = "select * from farming order by Id limit $start,3";

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
