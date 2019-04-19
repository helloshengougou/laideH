(function(){
var input2,input3,input4;
    // 输入手机号
    $(".user").blur(function(){
        console.log(1111)
        if(!$(this).val()){
            $(".userError").show();
        }else{
             input2 = isPoneAvailable($(this))
            console.log(input2)
        }
        if(!input2){
            $(".userError").show().text("请输入正确的手机号码!");
        }else{
            $(".userError").show().text("");
        }
        
    })

    //输入密码
    $(".pwd").blur(function(){
        if(!($(this).val())){
            $(".pwdError").show();
        }else{
            if(isPasswd($(this).val())){
                console.log(1)
                $(".pwdError").hide();
                input3=true;
                
            }else{
                $(".pwdError").show().text("密码格式不正确(字母数字下划线,6-20位)!");
                
            }
        }
    })

    // 图片验证码
    $("#code_input").blur(function(){
        console.log(1111)
        if(!$(this).val()){
            $(".verifyError").show();
        }else{
            $(".verifyError").hide();
            
        }
    })
    
    // 是否记住密码
    $(".selectp i").click(function(){
        if($(this).hasClass("focus")){
            $(this).removeClass("focus");
            input4 = false;
        }else{
            $(this).addClass("focus");
            input4 = true;
        }
        // $(this).addClass("focus")
    })
    


    // 登陆判断
    $("#btn").click(function(){
        if(!(input1&&input2&&input3)){
            console.log("错误")
        }else{
            console.log("成功")

            $.ajax({
                type: 'GET',
                url: 'api/login.php',
                data: {
                    user:$(".user").val(),
                    pwd:$(".pwd").val()
                },
                dataType: 'json',
                success: function(data){
                    // console.log(data)
                    console.log(data.code)
                   if(data.code===1){
                        $(".loginError").show();
                   }else if(data.code===0){
                        $(".loginError").hide();
                        if(input4){
                            console.log("持久")
                            setCookie("user",$(".user").val(),7)
                            location.href= "personal-center.html"
                        }else{
                            setCookie("user",$(".user").val())
                            console.log("会话")
                            location.href= "personal-center.html"
                        }
                   }
                }
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