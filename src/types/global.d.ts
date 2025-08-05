declare module 'bcryptjs' {
  export function hash(data: string, saltOrRounds: string | number): Promise<string>;
  export function hashSync(data: string, saltOrRounds: string | number): string;
  export function compare(data: string, encrypted: string): Promise<boolean>;
  export function compareSync(data: string, encrypted: string): boolean;
  export function genSalt(rounds?: number): Promise<string>;
  export function genSaltSync(rounds?: number): string;
}

declare module 'passport-jwt' {
  import { Strategy } from 'passport';
  export class Strategy extends Strategy {
    constructor(options: any, verify: any);
  }
  export const ExtractJwt: {
    fromAuthHeaderAsBearerToken(): any;
    fromAuthHeaderWithScheme(scheme: string): any;
    fromUrlQueryParameter(paramName: string): any;
    fromBodyField(fieldName: string): any;
    fromExtractFunction(extractFunction: any): any;
  };
} 