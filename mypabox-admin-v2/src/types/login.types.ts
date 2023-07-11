export type loginState = {
  email: string
  password: string
}

export type loginAction = {
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

export type Schools = {
  schools: School[]
}