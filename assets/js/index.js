$(function(){
  
  getUserInfo()

  $('#btnLogout').on('click',function(){
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
      //do something
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });
  })
})
var layer = layui.layer
function getUserInfo(){
$.ajax({
  method:'get',
  url:'/my/userinfo',
  // headers:{
  //   Authorization : localStorage.getItem('token')||''
  // },
  success:function(res){
    if(res.status !== 0) {
      return layer.msg('获取用户信息失败！')
    }
    renderAvatar(res.data)
  }
})
}

function  renderAvatar(user){
  var name = user.nickname || user.username
  $('#welcome').html(' 欢迎&nbsp;&nbsp;'+ name)

  if(user.user_pic !== null){
    $('.layui-nav-img').attr('src',user.user_pic)
    $('.text-avatar').hide()
  }else{
    $('.layui-nav-img').hide()
    var frist = name[0].toUpperCase()
    $('.text-avatar').html(frist).show()
  }
}