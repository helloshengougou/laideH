(function(){
    var input2,input3,input4,input5;
    // 输入图片验证码
    $("#code_input").blur(function(){
        console.log(1111)
        if(!$(this).val()){
            $(".verifyError").show();
        }else{
            $(".verifyError").hide();

        }
    })


    // 输入手机号
    $(".tal-code").blur(function(){
        console.log(1111)
        if(!$(this).val()){
            $(".userError-1").show();
        }else{
             input2 = isPoneAvailable($(this))
            console.log(input2)
        }
        if(!input2){
            $(".userError-1").show().text("请输入正确的手机号码!");
        }else{
            $(".userError-1").show().text("");
        }
        
    })

    // 点击获取验证码
    
    $(".tal-verify").click(function(){
        var arr = ['0','1','2','3','4','5','6','7','8','9'];
        var str = '';
        for(var i = 0 ; i < 6 ; i ++ )
            str += ''+arr[Math.floor(Math.random() * arr.length)];
            // console.log(str)

        $(".user").val(str)
    })
    
    // 验证密码
    $(".pwd-1").blur(function(){
        if(isPasswd($(this).val())){
            console.log(1)
            $(".pwdError-1").hide();
            input3 =true;
        }else{
            $(".pwdError-1").show();
            
        }
        

    })

    // 验证确认密码
    $(".pwd-2").blur(function(){
        if($(this).val()===$(".pwd-1").val()){
            console.log(1)
            $(".pwdError-2").hide();
            input4 = true

        }else{
            $(".pwdError-2").show();
        }
        

    })
    $("#btn").click(function(){
        // 判断是否确认用户协议
        // console.log($(".accept").attr('checked'))
        input5 = $(".accept").attr('checked')
        if(!(input1&&input2&&input3&&input4&&input5)){
            // if(!(input2&&input3)){
            console.log("失败")
        }else{
            console.log("成功")

           $.ajax({
                type: 'GET',
                url: 'api/register.php',
                data: {
                    user:$(".tal-code").val(),
                    pwd:$(".pwd-1").val()
                },
                dataType: 'json',
                success: function(data){
                    // console.log(data)
                    console.log(data.code)
                    if(data.code===1){
                        $(".no").show();
                    }else if(data.code===0){
                        $(".no").hide();
                        location.href= "login.html"
                    }
                },
           }) 
        }
        
    })
    






    // 手机号验证正则
    function isPoneAvailable($poneInput) {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test($poneInput.val())) {
            return false;
        } else {
            return true;
        }
    }
    // 密码验证正则
    function isPasswd(s){
        var patrn=/^(\w){6,20}$/;  
        if (!patrn.exec(s)){
            return false;
            // console.log(1)
        }
        return true;
        // console.log(2)

    }
    

})()