export function validateEmail(email: any) {
  const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let result = regex.test(email);
  return result;
}

export function validatePassword(password: any) {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  let result = regex.test(password);
  return result;
}
