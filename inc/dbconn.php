<?php
    //和MySQL数据库
    //phpStudy默认用户名：root   密码：root  
        header('content-type:text/html;charset=utf-8');
        date_default_timezone_set('PRC'); //设置中国时区
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "ldstore-app";
          
        // 创建与MySQL数据库的连接对象实例： $conn
        $conn = new mysqli($servername, $username, $password,$dbname);
        //保证查询出来的中文不会出现乱码
        mysqli_set_charset($conn, "utf8");

        // 检测连接是否成功，如果成功
        if ($conn->connect_error) {
            //die: 输出错误信息，并终止脚本执行
            die("连接失败: " . $conn->connect_error);
        } 
?>