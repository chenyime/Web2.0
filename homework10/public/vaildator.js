let password = '';

function vaildate(val, type) {
  switch(type) {
    case 'username':
      if (!/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(val)) {
        return '用户名应为 6~18 位英文字母、数字或下划线，必须以英文字母开头';
      }
      break;
    case 'id':
      if (!/^[1-9][0-9]{7}$/.test(val)) {
        return '学号应为 8 位数字，不能以 0 开头';
      }
      break;
    case 'tel':
      if (!/^[1-9][0-9]{10}$/.test(val)) {
        return '电话应为 11 位数字，不能以 0 开头';
      }
      break;
    case 'mail':
      if (!/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/.test(val)) {
        return '邮箱格式不正确';
      }
      break;
    case 'password':
      if (!/^[a-zA-Z0-9_-]{6,12}$/.test(val)) {
        return '密码格式不正确';
      }
      password = val;
      break;
    case 'repeat':
      if (val != password) {
        return '重复密码与密码不一致';
      }
  }
  return '';
}