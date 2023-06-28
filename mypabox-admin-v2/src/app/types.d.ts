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

type School  = {
  name: string;
  state: string;
  'state code': string;
  city: string;
}

type Schools = {
  schools: School[]
}