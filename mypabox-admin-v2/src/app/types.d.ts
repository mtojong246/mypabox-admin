type loginState = {
  email: string
  password: string
}

type loginAction = {
  type: string
  payload: {
    email: string,
    password: string
  }  
}