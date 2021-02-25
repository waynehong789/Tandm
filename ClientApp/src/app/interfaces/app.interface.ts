export interface AuthenticateRequest {
  userName: string;
  password: string;
}

export interface AuthenticateResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  token: string;
}

export interface CalculationRequest {
  firstNumber: number;
  secondNumber: number;
  operation: string;
}
